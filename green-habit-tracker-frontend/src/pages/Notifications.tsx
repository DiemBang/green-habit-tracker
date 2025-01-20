import { useState } from "react";
import { SettingButton } from "../components/SettingButton";

export const Notifications = () => {
  const [toggles, setToggles] = useState({
    dailyReminder: false,
    rewardNotification: false,
    challengeUpdates: false,
    streakReminder: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getIconStyle = (isOn: boolean) => {
    return isOn ? "text-customGreen" : "text-charcoalGray";
  };

  return (
    <>
      <h2>Notifications</h2>
      <SettingButton
        icon={toggles.dailyReminder ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("dailyReminder")}
        customIconStyle={getIconStyle(toggles.dailyReminder)}
      >
        <h4 className="text-sm mt-2 mb-2">Daily habit reminder</h4>
      </SettingButton>
      <SettingButton
        icon={toggles.rewardNotification ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("rewardNotification")}
        customIconStyle={getIconStyle(toggles.rewardNotification)}
      >
        <h4 className="text-sm mt-2 mb-2">Reward notification</h4>
      </SettingButton>
      <SettingButton
        icon={toggles.challengeUpdates ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("challengeUpdates")}
        customIconStyle={getIconStyle(toggles.challengeUpdates)}
      >
        <h4 className="text-sm mt-2 mb-2">Challenge updates</h4>
      </SettingButton>
      <SettingButton
        icon={toggles.streakReminder ? "toggle_on" : "toggle_off"}
        iconSize="text-4xl"
        onClick={() => handleToggle("streakReminder")}
        customIconStyle={getIconStyle(toggles.streakReminder)}
      >
        <h4 className="text-sm mt-2 mb-2">Streak reminder</h4>
      </SettingButton>
    </>
  );
};
