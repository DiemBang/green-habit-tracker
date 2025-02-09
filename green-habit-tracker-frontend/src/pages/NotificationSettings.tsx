import { useState } from "react";
import { SettingButton } from "../components/SettingButton";
import { useLoaderData } from "react-router-dom";
import { ISetting } from "../models/INotificationSetting";
import { updateNotificationSetting } from "../services/notificationSettingsService";

export const NotificationSettings = () => {
  const { settings } = useLoaderData<{ settings: ISetting }>();
  const [toggles, setToggles] = useState(settings);
  const [reminderTime, setReminderTime] = useState<string>("09:00");

  const handleToggle = async (key: keyof ISetting) => {
    const newValue = !toggles[key];
    setToggles((prev) => ({ ...prev, [key]: newValue })); // Optimistic update

    try {
      await updateNotificationSetting(key, newValue);
    } catch (error) {
      console.error(`Failed to update ${key}, reverting toggle`);
      setToggles((prev) => ({ ...prev, [key]: !newValue })); // Revert toggle if API fails
    }
  };

  const getIconStyle = (isOn: boolean) => {
    return isOn ? "text-customGreen" : "text-charcoalGray";
  };

  return (
    <>
      <h2>Notifications</h2>
      <SettingButton
        icon={toggles.dailyHabit ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("dailyHabit")}
        customIconStyle={getIconStyle(toggles.dailyHabit)}
      >
        <h4 className="text-sm mt-2 mb-2">Daily habit reminder</h4>
      </SettingButton>
      <button className="lg:w-[50%] flex items-center justify-between mb-2 border rounded-lg shadow-sm bg-cardWhite pl-4 pr-2 h-10 border-gray-300 hover:bg-headerAndFooterColor">
        <h4 className="text-sm mt-2 mb-2">Set daily reminder time</h4>
        <input
          type="time"
          value={reminderTime} // Assuming `reminderTime` is the state for the reminder time
          onChange={(e) => setReminderTime(e.target.value)} // Handle time change
          className="text-sm hover:bg-headerAndFooterColor"
        />
      </button>
      <SettingButton
        icon={toggles.reward ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("reward")}
        customIconStyle={getIconStyle(toggles.reward)}
      >
        <h4 className="text-sm mt-2 mb-2">Reward notification</h4>
      </SettingButton>
      <SettingButton
        icon={toggles.challenge ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("challenge")}
        customIconStyle={getIconStyle(toggles.challenge)}
      >
        <h4 className="text-sm mt-2 mb-2">Challenge updates</h4>
      </SettingButton>
      <SettingButton
        icon={toggles.streak ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("streak")}
        customIconStyle={getIconStyle(toggles.streak)}
      >
        <h4 className="text-sm mt-2 mb-2">Streak reminder</h4>
      </SettingButton>
    </>
  );
};
