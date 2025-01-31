import { log } from "console";
import { Request } from "express";
import { read } from "fs";
import { IChallenge } from "../models/IChallenge.js";

export const createDefaultNotificationSettings = async (
  req: Request,
  userId: string
) => {
  const defaultSettings = {
    userID: userId.toString(),
    settings: {
      dailyHabit: false,
      reward: false,
      challenge: false,
      streak: false,
    },
  };

  try {
    const collection = req.app.locals.db.collection("NotificationSettings");
    await collection.insertOne(defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error(
      `Failed to create default settings for user ${userId}:`,
      error
    );
    throw error;
  }
};

export const createNotification = async (
  req: Request,
  userID: string,
  message: string,
  category: string
) => {
  await req.app.locals.db.collection("UserNotification").insertOne({
    userID: userID,
    message: message,
    timestamp: new Date(),
    read: false,
    category: category,
  });
};

export const runNotifyOnFirstDayOfMonth = async (
  req: Request,
  userID: string
) => {
  const today = new Date();
  const currentChallenges = await getCurrentChallenges(req);
  // Check if today is the first day of the month
  if (today.getDate() === 23) {
    currentChallenges.forEach(async (element) => {
      try {
        await notifyNewChallengeAvailable(
          req,
          userID,
          element.name,
          "challenge"
        );
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });
  } else {
    console.log(
      "Today is not the first day of the month. No notification sent."
    );
  }
};

const getCurrentChallenges = async (req: Request): Promise<IChallenge[]> => {
  const currentMonth = new Date().getMonth() + 1;

  const challengeObjects = await req.app.locals.db
    .collection("Challenge") // Specify the type for the collection
    .find({ monthAvailableToJoin: currentMonth })
    .toArray();
  return challengeObjects;
};

const notifyNewChallengeAvailable = async (
  req: Request,
  userID: string,
  challengeName: string,
  category: string
) => {
  try {
    const collection = req.app.locals.db.collection("NotificationSettings");
    const userSettings = await collection.findOne({ userID });

    if (!userSettings?.settings?.challenge) {
      console.log(
        `Challenge notifications are disabled for user ${userID}. No notification created.`
      );
      return;
    }

    createNotification(
      req,
      userID,
      `New challenge alert! 🚀 Join the ${challengeName} and make a difference this month!`,
      category
    );
  } catch (error) {
    console.error(
      `Error checking notification settings for user ${userID}:`,
      error
    );
    throw error;
  }
};

export const notifyDailyHabitReminder = async (
  req: Request,
  userID: string
) => {
  const db = req.app.locals.db;
  const notificationSettingsCollection = db.collection("NotificationSettings");
  const notificationsCollection = db.collection("UserNotification");

  // Get the user's notification settings
  const userSettings = await notificationSettingsCollection.findOne({ userID });

  // Check if daily habit reminders are enabled
  if (!userSettings?.settings?.dailyHabit) {
    console.log(
      `Daily habit reminders are disabled for user ${userID}. No notification created.`
    );
    return;
  }

  // Get the start of today (midnight)
  const now = new Date();
  const midnightToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // Check if a 'habitReminder' notification has already been sent since midnight
  const existingNotification = await notificationsCollection.findOne({
    userID,
    category: "habitReminder",
    timestamp: { $gte: midnightToday }, // Notifications sent today
  });

  if (existingNotification) {
    console.log(
      `Notification for category 'habitReminder' already sent to user ${userID} today.`
    );
    return;
  }

  // Create the notification
  await createNotification(
    req,
    userID,
    `A greener world starts with small actions. 🌎 Complete your habits and keep up the great work!`,
    "habitReminder"
  );

  console.log(`Daily habit reminder sent to user ${userID}.`);
};
