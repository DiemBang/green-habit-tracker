import { Router, Request, Response } from "express";
import express from "express";
import { IUserNotification } from "../models/IUserNotification.js";

const router = Router();

/* GET userNotifications */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserNotification")
    .find()
    .toArray()
    .then((results: Array<IUserNotification>) => {
      console.log("results", results);
      res.json(results);
    });
});

// GET userNotifications for specific user
router.post("/", async (req: Request, res: Response): Promise<any> => {
  req.app.locals.db
    .collection("UserNotification") // Specify the type for the collection
    .find({ userID: req.body.userID })
    .toArray()
    .then((results: IUserNotification[]) => {
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
