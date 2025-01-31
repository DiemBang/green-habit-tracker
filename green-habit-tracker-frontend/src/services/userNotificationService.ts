import axios from "axios";
import { IUserNotification } from "../models/IUserNotification";

const BASE_URL = `${
  import.meta.env.VITE_BACKEND_BASE_URL
}/api/userNotifications`;

export const getUserNotifications = async (
  userID: string
): Promise<IUserNotification[]> => {
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};

export const markNotificationsAsRead = async () => {
  const userID = localStorage.getItem("userID");
  try {
    await axios.patch(BASE_URL + "/mark-read", {
      userID,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
