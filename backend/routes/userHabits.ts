import { Router, Request, Response } from "express";
import { IUserHabit } from "../models/IUserHabit";

var express = require("express");
const router = Router();

/* GET userHabits */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserHabit")
    .find()
    .toArray()
    .then((results: Array<IUserHabit>) => {
      console.log("results", results);
      res.json(results);
    });
});

/* Add habit for User */
router.post("/add", async (req: Request, res: Response) => {
  console.log("Incoming request body:", req.body);
  try {
    const dateStarted: Date = new Date();

    // Get Habit object so we can get the name
    const habit = await req.app.locals.db
      .collection("Habit")
      .findOne({ identifier: req.body.habitIdentifier });

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
    console.log("Insert Result:", result);

    res.json({
      message: `New userHabit added with ID ${result.insertedId}`,
      userHabitID: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
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

export default router;
