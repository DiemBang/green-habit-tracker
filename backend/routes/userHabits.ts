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

    // Create New User Object
    const userHabit = {
      UserID: req.body.userID,
      HabitIdentifier: req.body.habitIdentifier,
      DateStarted: dateStarted,
      ReminderTime: req.body.reminderTime,
      Frequency: req.body.frequency,
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

// ToDo: GET userhabit for specific user

export default router;
