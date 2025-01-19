import { Router, Request, Response } from "express";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted.js";
import express from "express";

const router = Router();

/* GET userHabitCompleted */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserHabitCompleted")
    .find()
    .toArray()
    .then((results: Array<IUserHabitCompleted>) => {
      console.log("results", results);
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
      console.log("results", results);
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

/* Add completed habit for User */
router.post("/add", async (req: Request, res: Response): Promise<void> => {
  console.log("Incoming request body:", req.body);
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
