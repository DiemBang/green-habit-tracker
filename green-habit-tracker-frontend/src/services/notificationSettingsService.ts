import axios from "axios";

const BASE_URL = `${
  import.meta.env.VITE_BACKEND_BASE_URL
}/api/notificationSettings`;

export const updateNotificationSetting = async (
  key: string,
  value: boolean
) => {
  try {
    let userID = localStorage.getItem("userID") || "";
    const response = await axios.post(`${BASE_URL}/update`, {
      setting: key,
      enabled: value,
      userID: userID,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating notification setting for ${key}:`, error);
    throw error;
  }
};

export const getNotificationSettings = async (userID: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/get`, {
      userID: userID,
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting notification setting for ${userID}:`, error);
    throw error;
  }
};
