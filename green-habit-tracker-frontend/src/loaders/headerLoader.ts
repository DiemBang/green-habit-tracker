import { IUserNotification } from "../models/IUserNotification";
import { getUserNotifications } from "../services/userNotificationService";

export const headerLoader = async () => {
  let userID = localStorage.getItem("userID") || "";

  let userNotification: IUserNotification = await getUserNotifications(userID);
  console.log("userNotification", userNotification);

  return userNotification;
};
