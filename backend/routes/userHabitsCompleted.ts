import { Router, Request, Response } from "express";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted.js";
import express from "express";
import { addDays, isPast } from "date-fns";
import mongodb from "mongodb";

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
        .updateOne({ _id: challengeID }, { dateEnded: challengeEndDate });

      // Count `UserHabitCompleted` for the habitIdentifier within the date range
      const completedActions = await req.app.locals.db
        .collection("UserHabitCompleted")
        .countDocuments({
          userID,
          habitIdentifier,
          dateCompleted: { $gte: new Date(dateJoined), $lte: challengeEndDate },
        });

      if (completedActions >= noOfActionsCompletedNeeded) {
        // Mark as completed
        await req.app.locals.db.collection("UserChallengeCompleted").insertOne({
          userID,
          challengeID,
          challengeName: challenge.name,
          dateCompleted: challengeEndDate,
        });
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
        // Mark as completed early
        await req.app.locals.db.collection("UserChallengeCompleted").insertOne({
          userID,
          challengeID,
          challengeName: challenge.name,
          dateCompleted: new Date(),
        });
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
      console.log("Insert Result:", result);

      await checkAndUpdateChallengeStatusForUser(req.body.userID, req);

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
