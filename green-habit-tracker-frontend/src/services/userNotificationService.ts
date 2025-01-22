import axios from "axios";
import { IUserNotification } from "../models/IUserNotification";

const BASE_URL = `${
  import.meta.env.VITE_BACKEND_BASE_URL
}/api/userNotifications`;

export const getUserNotifications = async (
  userID: string
): Promise<IUserNotification> => {
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
