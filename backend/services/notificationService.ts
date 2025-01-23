import { log } from "console";
import { Request } from "express";

export const createDefaultNotificationSettings = async (
  req: Request,
  userId: string
) => {
  const defaultSettings = {
    userID: userId,
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
    console.log(`Default settings created for user ${userId}`);
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
  message: string
) => {
  await req.app.locals.db.collection("UserNotification").insertOne({
    userID: userID,
    message: message,
    timestamp: new Date(),
  });
};

export const notifyNewChallengeAvailable = async (
  req: Request,
  userID: string,
  challengeName: string,
  category: string
) => {
  // TODO: check if UserNotifications are turned on for category and user
  // Otherwise just return without creating a Notification
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
      `New challenge alert! 🚀 Join the ${challengeName} and make a difference this month!`
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
  // TODO: Check if daily habit reminders are enabled for the user
  const collection = req.app.locals.db.collection("NotificationSettings");
  const userSettings = await collection.findOne({ userID: userID });
  console.log("daily habit1");
  console.log("userID", userID);
  // console.log("collection", collection);
  console.log("userSettings", userSettings);

  if (userSettings?.settings?.dailyHabit) {
    console.log("daily habit2");

    createNotification(
      req,
      userID,
      `A greener world starts with small actions. 🌎 Complete your habits and keep up the great work!`
    );
  } else {
    console.log(
      `Daily habit reminders are disabled for user ${userID}. No notification created.`
    );
  }
};
