import { Router, Request, Response } from "express";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted";

var express = require("express");
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

export default router;
