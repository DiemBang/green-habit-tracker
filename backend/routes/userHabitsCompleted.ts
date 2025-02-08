import { Router, Request, Response } from "express";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted.js";
import express from "express";
import { addDays, isPast } from "date-fns";
import mongodb, { ObjectId } from "mongodb";
import { getTotalPointsForUserChallengesCompleted } from "./userChallengesCompleted.js";

const router = Router();

/* GET userHabitCompleted */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserHabitCompleted")
    .find()
    .toArray()
    .then((results: Array<IUserHabitCompleted>) => {
      res.json(results);
    });
});

/* GET userHabitCompleted for specific user */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  let findUser;
  try {
    findUser = req.body.userID;
  } catch (error) {
    return (res as Response).json({ error: "Invalid User ID format." });
  }
  req.app.locals.db
    .collection("UserHabitCompleted") // Specify the type for the collection
    .find({ userID: findUser })
    .sort({ dateCompleted: 1 })
    .toArray()
    .then((results: IUserHabitCompleted[]) => {
      if (results.length === 0) {
        // Handle case where no user is found
        return res.status(404).json({ error: "User not found." });
      }
      res.json(results);
    })
    .catch((dbError: unknown) => {
      // Handle database errors
      console.error("Database error:", dbError);
      res
        .status(500)
        .json({ error: "Internal Server Error. Please try again later." });
    });
});

const getTotalPointsForUserHabitsCompleted = async (
  userID: string,
  req: Request
): Promise<number> => {
  const result = await req.app.locals.db
    .collection("UserHabitCompleted")
    .aggregate([
      {
        // Match documents for the given userID
        $match: { userID: userID }, //get item from local storage?
      },
      {
        // Perform a $lookup to join with the Habit collection
        $lookup: {
          from: "Habit",
          localField: "habitIdentifier",
          foreignField: "identifier",
          as: "habitDetails",
        },
      },
      {
        // Unwind the habitDetails array to flatten the documents
        $unwind: "$habitDetails",
      },
      {
        // Group by userID and calculate the total points
        $group: {
          _id: "$userID",
          totalPoints: { $sum: "$habitDetails.points" },
        },
      },
    ])
    .toArray();

  return result.length > 0 ? result[0].totalPoints : 0;
};

const getTotalPointsAndSetItForUser = async (
  userID: string,
  req: Request
): Promise<void> => {
  try {
    // Step 1: Get the total points for the user's completed habits
    const totalHabitPoints = await getTotalPointsForUserHabitsCompleted(
      userID,
      req
    );
    const totalChallengePoints = await getTotalPointsForUserChallengesCompleted(
      userID,
      req
    );
    let userObjectID = new ObjectId(req.body.userID);
    // Step 2: Update the "points" field in the User collection
    const result = await req.app.locals.db.collection("User").updateOne(
      { _id: userObjectID }, // Match the user by userID
      { $set: { points: totalHabitPoints + totalChallengePoints } } // Update the "points" field with the calculated total
    );

    if (result.modifiedCount > 0) {
    } else {
      console.log(`No updates made. User ${userID} may not exist.`);
    }
  } catch (error) {
    console.error("Error updating total points for user:", error);
    throw error; // Re-throw the error to propagate it
  }
};

const checkAndUpdateChallengeStatusForUser = async (
  userID: string,
  req: Request
): Promise<void> => {
  // Fetch userChallenges that do not have a `dateEnded`
  const userChallenges = await req.app.locals.db
    .collection("UserChallenge")
    .find({ dateEnded: { $exists: false }, userID: userID })
    .toArray();
  for (const userChallenge of userChallenges) {
    const { challengeID, dateJoined, userID } = userChallenge;

    const objectId = new mongodb.ObjectId(challengeID);
    // Get the corresponding Challenge object
    const challenge = await req.app.locals.db
      .collection("Challenge")
      .findOne({ _id: objectId });
    if (!challenge) {
      console.error(`Challenge not found for ID: ${challengeID}`);
      continue;
    }

    const {
      lengthOfChallengeInDays,
      noOfActionsCompletedNeeded,
      habitIdentifier,
    } = challenge;

    const challengeEndDate = addDays(
      new Date(dateJoined),
      lengthOfChallengeInDays
    );

    // Check if the challenge end date is in the past
    if (isPast(challengeEndDate)) {
      await req.app.locals.db
        .collection("UserChallenge")
        .updateOne(
          { _id: challengeID },
          { $set: { dateEnded: challengeEndDate } }
        );

      // Count `UserHabitCompleted` for the habitIdentifier within the date range
      const completedActions = await req.app.locals.db
        .collection("UserHabitCompleted")
        .countDocuments({
          userID,
          habitIdentifier,
          dateCompleted: { $gte: new Date(dateJoined), $lte: challengeEndDate },
        });

      if (completedActions >= noOfActionsCompletedNeeded) {
        const existingCompletion = await req.app.locals.db
          .collection("UserChallengeCompleted")
          .findOne({ userID, challengeID });

        if (!existingCompletion) {
          // Mark as completed only if it doesn't already exist
          await req.app.locals.db
            .collection("UserChallengeCompleted")
            .insertOne({
              userID,
              challengeID,
              challengeName: challenge.name,
              dateCompleted: challengeEndDate,
            });
        }
      } else {
        // Create a notification object
        await req.app.locals.db.collection("UserNotification").insertOne({
          userID,
          message: `You didn't complete the challenge: ${challenge.name}. Try again!`,
          timestamp: new Date(),
        });
      }
    } else {
      // Challenge end date is in the future; check progress
      const completedActions = await req.app.locals.db
        .collection("UserHabitCompleted")
        .countDocuments({
          userID,
          habitIdentifier,
          dateCompleted: { $gte: new Date(dateJoined), $lte: challengeEndDate },
        });

      if (completedActions >= noOfActionsCompletedNeeded) {
        await req.app.locals.db
          .collection("UserChallenge")
          .updateOne(
            { _id: userChallenge._id },
            { $set: { dateEnded: new Date() } }
          );

        const existingCompletion = await req.app.locals.db
          .collection("UserChallengeCompleted")
          .findOne({ userID, challengeID });

        if (!existingCompletion) {
          // Mark as completed early
          await req.app.locals.db
            .collection("UserChallengeCompleted")
            .insertOne({
              userID,
              challengeID,
              challengeName: challenge.name,
              dateCompleted: new Date(),
            });
        }
      }
    }
  }
};

/* Add completed habit for User */
router.post("/add", async (req: Request, res: Response): Promise<void> => {
  try {
    const dateCompleted: Date = new Date();

    // Calculate the start and end of the current day
    const startOfToday = new Date(
      dateCompleted.getFullYear(),
      dateCompleted.getMonth(),
      dateCompleted.getDate()
    );
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(startOfToday.getDate() + 1);

    // Check if the habit exists in the Habit collection
    const habit = await req.app.locals.db
      .collection("Habit")
      .findOne({ identifier: req.body.habitIdentifier });

    if (!habit) {
      res.status(404).json({ error: "Habit not found." });
      return;
    }

    const habitName = habit.name;

    // Check if UserHabitCompleted exists for this user and habit today
    const existingHabit = await req.app.locals.db
      .collection("UserHabitCompleted")
      .findOne({
        userID: req.body.userID,
        habitIdentifier: req.body.habitIdentifier,
        dateCompleted: { $gte: startOfToday, $lt: endOfToday },
      });

    if (existingHabit) {
      // If the habit is already completed today, delete it
      await req.app.locals.db
        .collection("UserHabitCompleted")
        .deleteOne({ _id: existingHabit._id });

      res.json({
        message: "Habit completion removed for today.",
        userHabitCompletedID: existingHabit._id,
      });
      return;
    } else {
      // Create New User Object
      const userHabitCompleted = {
        userID: req.body.userID,
        habitIdentifier: req.body.habitIdentifier,
        dateCompleted: dateCompleted,
        name: habitName,
      };

      // Insert userHabit into Database
      const result = await req.app.locals.db
        .collection("UserHabitCompleted")
        .insertOne(userHabitCompleted);
      await checkAndUpdateChallengeStatusForUser(req.body.userID, req);
      await getTotalPointsAndSetItForUser(req.body.userID, req);

      res.json({
        message: `New userHabitCompleted added with ID ${result.insertedId}`,
        userHabitCompletedID: result.insertedId,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
