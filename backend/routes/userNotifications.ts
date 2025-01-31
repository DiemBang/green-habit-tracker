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
    .sort({ timestamp: -1 })
    .toArray()
    .then((results: Array<IUserNotification>) => {
      res.json(results);
    });
});

// GET userNotifications for specific user
router.post("/", async (req: Request, res: Response): Promise<any> => {
  req.app.locals.db
    .collection("UserNotification") // Specify the type for the collection
    .find({ userID: req.body.userID })
    .sort({ timestamp: -1 })
    .limit(20)
    .toArray()
    .then((results: IUserNotification[]) => {
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

// MARK userNotifications as read
router.patch(
  "/mark-read",
  async (req: Request, res: Response): Promise<any> => {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ error: "User ID is required." });
    }

    try {
      const result = await req.app.locals.db
        .collection("UserNotification")
        .updateMany(
          { userID: userID, read: false }, // Update only unread notifications for the user
          { $set: { read: true } } // Set the read status to true
        );

      if (result.modifiedCount === 0) {
        return res
          .status(200)
          .json({ message: "No unread notifications found for the user." });
      }

      res.status(200).json({
        message: "Notifications marked as read successfully.",
        updatedCount: result.modifiedCount,
      });
    } catch (dbError: unknown) {
      console.error("Database error:", dbError);
      res
        .status(500)
        .json({ error: "Internal Server Error. Please try again later." });
    }
  }
);

export default router;
