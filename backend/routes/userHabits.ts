import { Router, Request, Response } from "express";
import { IUserHabit } from "../models/IUserHabit.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

/* GET userHabits */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserHabit")
    .find()
    .toArray()
    .then((results: Array<IUserHabit>) => {
      res.json(results);
    });
});

/* Add habit for User */
router.post("/add", async (req: Request, res: Response): Promise<void> => {
  try {
    const dateStarted: Date = new Date();

    // Check if the habit already exists for the user
    const existingHabit = await req.app.locals.db
      .collection("UserHabit")
      .findOne({
        userID: req.body.userID,
        habitIdentifier: req.body.habitIdentifier,
      });

    if (existingHabit) {
      res.status(400).json({ error: "Habit already exists." });
      return;
    }

    // Get Habit object so we can get the name
    const habit = await req.app.locals.db
      .collection("Habit")
      .findOne({ identifier: req.body.habitIdentifier });

    if (!habit) {
      res.status(404).json({ error: "Habit not found." });
      return;
    }

    const habitName = habit.name;

    // Create New User Object
    const userHabit = {
      userID: req.body.userID,
      habitIdentifier: req.body.habitIdentifier,
      dateStarted: dateStarted,
      reminderTime: req.body.reminderTime,
      frequency: req.body.frequency,
      name: habitName,
    };

    // Insert userHabit into Database
    const result = await req.app.locals.db
      .collection("UserHabit")
      .insertOne(userHabit);

    res.json({
      message: `New userHabit added with ID ${result.insertedId}`,
      userHabitID: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE habit for User
router.delete("/delete", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userID, habitIdentifier } = req.body;

    // Validate the required fields
    if (!userID || !habitIdentifier) {
      res.status(400).json({ error: "Missing userID or habitIdentifier." });
      return;
    }

    // Attempt to delete the habit
    const result = await req.app.locals.db
      .collection("UserHabit")
      .deleteOne({ userID, habitIdentifier });

    if (result.deletedCount === 0) {
      // No matching habit found for deletion
      res
        .status(404)
        .json({ error: "Habit not found for the specified user." });
      return;
    }

    res.json({ message: "Habit deleted successfully." });
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET userhabit for specific user
router.post("/", async (req: Request, res: Response): Promise<any> => {
  req.app.locals.db
    .collection("UserHabit") // Specify the type for the collection
    .find({ userID: req.body.userID })
    .toArray()
    .then((results: IUserHabit[]) => {
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

// GET userhabit with completedToday status for specific user
router.post(
  "/withCompletedTodayStatus",
  async (req: Request, res: Response): Promise<any> => {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(startOfToday.getDate() + 1);

    const userID = req.body.userID;

    req.app.locals.db
      .collection("UserHabit")
      .aggregate([
        // Step 1: Match UserHabit documents for the specified userId
        { $match: { userID: userID } },

        // Step 2: Perform a lookup to join with UserHabitCompleted for today's entries
        {
          $lookup: {
            from: "UserHabitCompleted",
            let: {
              habitIdentifier: "$habitIdentifier",
              habitUserID: "$userID",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$habitIdentifier", "$$habitIdentifier"] },
                      { $eq: ["$userID", "$$habitUserID"] },
                      { $gte: ["$dateCompleted", startOfToday] },
                      { $lt: ["$dateCompleted", endOfToday] },
                    ],
                  },
                },
              },
            ],
            as: "completedTodayEntries",
          },
        },

        // Step 3: Perform a lookup to fetch the most recent completion date
        {
          $lookup: {
            from: "UserHabitCompleted",
            let: {
              habitIdentifier: "$habitIdentifier",
              habitUserID: "$userID",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$habitIdentifier", "$$habitIdentifier"] },
                      { $eq: ["$userID", "$$habitUserID"] },
                    ],
                  },
                },
              },
              { $sort: { dateCompleted: -1 } }, // Sort by dateCompleted in descending order
              { $limit: 1 }, // Get the most recent entry
            ],
            as: "lastCompletedEntry",
          },
        },

        // Step 4: Add the completedToday and lastCompletedDate fields
        {
          $addFields: {
            completedToday: { $gt: [{ $size: "$completedTodayEntries" }, 0] },
            lastCompletedDate: {
              $ifNull: [
                { $arrayElemAt: ["$lastCompletedEntry.dateCompleted", 0] }, // Extract the dateCompleted
                null, // Fallback to null if no lastCompletedEntry exists
              ],
            },
          },
        },

        // Step 5: Clean up unnecessary fields
        {
          $project: {
            completedTodayEntries: 0, // Remove the temporary join array for today's entries
            lastCompletedEntry: 0, // Remove the temporary join array for the last completed date
          },
        },
      ])
      .toArray()
      .then((results: IUserHabit[]) => {
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
  }
);

router.post(
  "/withCompletedStatusByDay",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userID, day } = req.body;

      if (!userID || !day) {
        return res.status(400).json({ error: "userID and day are required." });
      }

      // Parse the "day" parameter to calculate the start and end of the specified day
      const specifiedDay = new Date(day);
      if (isNaN(specifiedDay.getTime())) {
        return res.status(400).json({ error: "Invalid date format." });
      }

      const startOfDay = new Date(
        specifiedDay.getFullYear(),
        specifiedDay.getMonth(),
        specifiedDay.getDate()
      );
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(startOfDay.getDate() + 1);

      // MongoDB aggregation pipeline
      const results = await req.app.locals.db
        .collection("UserHabit")
        .aggregate([
          // Step 1: Match UserHabit documents for the specified userId
          { $match: { userID: userID } },

          // Step 2: Lookup to join with UserHabitCompleted for the specified day's entries
          {
            $lookup: {
              from: "UserHabitCompleted",
              let: {
                habitIdentifier: "$habitIdentifier",
                habitUserID: "$userID",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$habitIdentifier", "$$habitIdentifier"] },
                        { $eq: ["$userID", "$$habitUserID"] },
                        { $gte: ["$dateCompleted", startOfDay] },
                        { $lt: ["$dateCompleted", endOfDay] },
                      ],
                    },
                  },
                },
              ],
              as: "completedTodayEntries",
            },
          },

          // Step 3: Lookup to fetch the most recent completion before the specified day
          {
            $lookup: {
              from: "UserHabitCompleted",
              let: {
                habitIdentifier: "$habitIdentifier",
                habitUserID: "$userID",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$habitIdentifier", "$$habitIdentifier"] },
                        { $eq: ["$userID", "$$habitUserID"] },
                        { $lt: ["$dateCompleted", endOfDay] }, // Before the end of the specified day
                      ],
                    },
                  },
                },
                { $sort: { dateCompleted: -1 } }, // Sort by dateCompleted in descending order
                { $limit: 1 }, // Get the most recent entry
              ],
              as: "lastCompletedEntry",
            },
          },

          // Step 4: Add the completedToday and lastCompletedDate fields
          {
            $addFields: {
              completedToday: { $gt: [{ $size: "$completedTodayEntries" }, 0] },
              lastCompletedDate: {
                $ifNull: [
                  { $arrayElemAt: ["$lastCompletedEntry.dateCompleted", 0] }, // Extract the dateCompleted
                  null, // Fallback to null if no lastCompletedEntry exists
                ],
              },
            },
          },

          // Step 5: Clean up unnecessary fields
          {
            $project: {
              completedTodayEntries: 0, // Remove the temporary join array for today's entries
              lastCompletedEntry: 0, // Remove the temporary join array for the last completed date
            },
          },
        ])
        .toArray();

      res.json(results);
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({
        error: "Internal Server Error. Please try again later.",
      });
    }
  }
);

export default router;
