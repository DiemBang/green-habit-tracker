import { INotificationSetting } from "../models/INotificationSetting";
import { getNotificationSettings } from "../services/notificationSettingsService";

export const notificationSettingsLoader = async (): Promise<any> => {
  let userID = localStorage.getItem("userID") || "";

  let notificationSettings: INotificationSetting =
    await getNotificationSettings(userID);

  return { settings: notificationSettings.settings };
};
