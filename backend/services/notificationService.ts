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
  await req.app.locals.db.collection("Notications").create({
    userID,
    message: message,
    timestamp: new Date(),
  });
};

export const publishNewChallengeAvailableNotification = async (
  req: Request,
  userID: string,
  challengeName: string,
  category: string
) => {
  // TODO: check if UserNotifications are turned on for category and user
  // Otherwise just return without creating a Notification
  createNotification(
    req,
    userID,
    `New challenge alert! 🚀 Join the ${challengeName} and make a difference this month!`
  );
};
