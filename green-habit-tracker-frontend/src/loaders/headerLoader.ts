import { IUser } from "../models/IUser";
import { IUserNotification } from "../models/IUserNotification";
import { getUserNotifications } from "../services/userNotificationService";
import { getUser } from "../services/userService";

export const headerLoader = async () => {
  let userID = localStorage.getItem("userID") || "";
  let user: IUser = await getUser(userID);

  let notifications: IUserNotification[] = await getUserNotifications(userID);
  console.log("notifications", notifications);

  return { notifications, user };
};
