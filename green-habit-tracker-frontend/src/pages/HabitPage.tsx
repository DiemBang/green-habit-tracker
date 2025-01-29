import { useLoaderData } from "react-router-dom";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { useState } from "react";
import axios from "axios";
import { CardSection } from "../components/CardSection";
import { PointsBadge } from "../components/PointsBadge";

export const HabitPage = () => {
  const { habit, isAlreadyAdded } = useLoaderData();
  const [frequency, setFrequency] = useState<string>("daily");
  const [reminderTime, setReminderTime] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean>(isAlreadyAdded);

  const handleAdd = async () => {
    try {
      const userID = localStorage.getItem("userID") || "";

      const userHabit = {
        userID: userID,
        habitIdentifier: habit.identifier,
        reminderTime: reminderTime,
        frequency: frequency,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/userHabits/add`,
        userHabit
      );
      console.log("Habit added to user:", response.data);
      setIsAdded(true);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleRemove = async () => {
    try {
      const userID = localStorage.getItem("userID");

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/userHabits/delete`,
        {
          data: {
            userID: userID,
            habitIdentifier: habit.identifier,
          },
        }
      );
      console.log("Habit removed from user.");
      setIsAdded(false);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <>
      <CardSection className="mb-20">
        {/* Habit Title */}
        <h2 className="m-0">{habit.name}</h2>

        {/* CO2 and Points */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h4>CO₂ Saved</h4>
            <p className="text-gray-600">
              {habit.co2EmissionKgPerAction} kg/action
            </p>
          </div>
          <div>
            <h4>Points</h4>
            <PointsBadge>{habit.points}</PointsBadge>
          </div>
        </div>

        {/* Description */}
        <article className="mb-6">
          <p className="text-gray-600">{habit.description}</p>
        </article>

        {/* Good to Know */}
        <article className="mb-6">
          <h4>Did you know?</h4>
          <p className="text-gray-600">{habit.goodToKnow}</p>
        </article>

        {/* Frequency and Reminder Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Frequency Section */}
          <div>
            <h4>Frequency</h4>
            <select
              id="frequency"
              className="w-full px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Reminder Time Section */}
          <div>
            <h4>Set Reminder Time</h4>
            <input
              type="time"
              className="w-full h-[2.875rem] px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Remove Button */}
        <div className="my-2">
          <ButtonWithIcon
            text={isAdded ? "Remove" : "Add"}
            onClick={isAdded ? handleRemove : handleAdd}
          />
        </div>
      </CardSection>
    </>
  );
};
