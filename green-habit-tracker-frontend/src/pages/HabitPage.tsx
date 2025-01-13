import { useLoaderData } from "react-router-dom";
import { IHabit } from "../models/IHabit";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { useState } from "react";
import axios from "axios";

export const HabitPage = () => {
  const habit = useLoaderData() as IHabit;
  const [frequency, setFrequency] = useState<string>("daily");
  const [reminderTime, setReminderTime] = useState<string>("");

  const handleAdd = async () => {
    const userHabit = {
      userID: localStorage.getItem("userID"),
      habitIdentifier: habit.identifier,
      reminderTime: reminderTime,
      frequency: frequency,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/userHabits/add",
        userHabit
      );
      console.log("Habit added to user:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        {/* Habit Title */}
        <h3 className="text-green-600">{habit.name}</h3>

        {/* Add Button */}
        <div className="mb-6">
          <ButtonWithIcon text="Add" onClick={handleAdd} />
        </div>

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
            <p className="text-gray-600">{habit.points}</p>
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
      </section>
    </>
  );
};
