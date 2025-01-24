import { Router, Request, Response } from "express";
import { IUserChallenge } from "../models/IUserChallenge.js";
import { ObjectId } from "mongodb";
import express from "express";

// var express = require("express");
const router = Router();

/* GET userChallenge */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserChallenge")
    .find()
    .toArray()
    .then((results: Array<IUserChallenge>) => {
      console.log("results", results);
      res.json(results);
    });
});

/* GET userChallenge for specific user */
router.post("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserChallenge")
    .find({ userID: req.body.userID })
    .toArray()
    .then((results: Array<IUserChallenge>) => {
      console.log("results", results);
      res.json(results);
    });
});

/* Add challenge for User */
router.post("/add", async (req: Request, res: Response): Promise<void> => {
  console.log("Incoming request body:", req.body);
  try {
    const dateJoined: Date = new Date();
    let findChallenge;
    try {
      findChallenge = new ObjectId(req.body.challengeID);
    } catch (error) {
      res.status(400).json({ error: "Invalid User ID format." });
      return;
    }
    // Get Challenge object so we can get the name
    const challenge = await req.app.locals.db
      .collection("Challenge")
      .findOne({ _id: findChallenge });

    // Create New userChallenge Object
    const userChallenge = {
      userID: req.body.userID,
      challengeID: req.body.challengeID,
      challengeName: challenge.name,
      dateJoined: dateJoined,
      lengthOfChallengeInDays: challenge.lengthOfChallengeInDays,
    };

    // Insert userChallenge into Database
    const result = await req.app.locals.db
      .collection("UserChallenge")
      .insertOne(userChallenge);
    console.log("Insert Result:", result);

    res.json({
      message: `New userChallenge added with ID ${result.insertedId}`,
      userChallengeID: result.insertedId,
    });
    return;
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

/* DELETE challenge for User */
router.delete("/delete", async (req: Request, res: Response): Promise<void> => {
  console.log("Incoming request body for deletion:", req.body);
  try {
    const { userID, challengeID } = req.body;

    // Validate IDs
    if (!ObjectId.isValid(challengeID)) {
      res.status(400).json({ error: "Invalid challenge ID format." });
      return;
    }

    // Remove the user's challenge from the UserChallenge collection
    const result = await req.app.locals.db
      .collection("UserChallenge")
      .deleteOne({
        userID: userID,
        challengeID: challengeID,
      });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "User challenge not found." });
      return;
    }

    res.json({ message: "User challenge deleted successfully." });
    return;
  } catch (error) {
    console.error("Error deleting user challenge:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

export default router;
