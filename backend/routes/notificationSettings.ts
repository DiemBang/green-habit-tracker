import { Router, Request, Response } from "express";
import express from "express";
import { IUserNotification } from "../models/IUserNotification.js";
import { ObjectId } from "mongodb";

const router = Router();

// Update a specific notification setting for a user
router.post("/update", async (req: Request, res: Response): Promise<void> => {
  const { userID, setting, enabled } = req.body;

  if (!userID || !setting || typeof enabled !== "boolean") {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  try {
    const collection = req.app.locals.db.collection("NotificationSettings");
    const result = await collection.updateOne(
      { userID: userID },
      { $set: { [`settings.${setting}`]: enabled } },
      { upsert: true } // Create settings object if it doesn't exist
    );

    res.status(200).json({ message: "Notification setting updated" });
  } catch (error) {
    console.error("Error updating notification setting:", error);
    res.status(500).json({ error: "Failed to update notification setting" });
  }
});

// Get notification settings for a user
router.post("/get", async (req: Request, res: Response): Promise<void> => {
  const { userID } = req.body;

  if (!userID) {
    res.status(400).json({ error: "Missing userId" });
    return;
  }

  try {
    const collection = req.app.locals.db.collection("NotificationSettings");
    const userSettings = await collection.findOne({
      userID: userID,
    });

    res.status(200).json(userSettings);
  } catch (error) {
    console.error("Error retrieving notification settings:", error);
    res.status(500).json({ error: "Failed to retrieve notification settings" });
  }
});

export default router;
