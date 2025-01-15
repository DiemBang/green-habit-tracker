import { Link, useLoaderData } from "react-router-dom";
import { IUserHabit } from "../models/IUserHabit";
import { useState } from "react";
import { addUserHabitCompletedForUser } from "../services/userHabitCompletedService";
import { CardSection } from "../components/CardSection";
import { useCalendar } from "../contexts/CalendarContext";

export const Home = () => {
  const { sustainabilityFacts, userHabits } = useLoaderData();
  const [habits, setHabits] = useState(userHabits);
  const { selectedDate } = useCalendar();

  const formattedDate = selectedDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate the index for today's fact
  const today = new Date();
  const factIndex = today.getDate() % sustainabilityFacts.length; // Ensures index wraps around

  // WIP: Toggle habit completion
  const toggleCompletion = async (id: string) => {
    console.log("Toggling habit completion for habit with ID:", id);
    const updatedHabits: IUserHabit[] = [];

    for (const habit of habits) {
      if (habit._id === id) {
        // Toggle the `completedToday` value for the matching habit
        const updatedHabit = {
          ...habit,
          completedToday: !habit.completedToday,
        };

        updatedHabits.push(updatedHabit);
        // TODO: Make backend call to add or remove CompletedUserHabit here
        addUserHabitCompletedForUser(
          habit.userID,
          habit.habitIdentifier,
          habit.name
        );
      } else {
        updatedHabits.push(habit);
      }
    }

    // Update the state with the new habits array
    setHabits(updatedHabits);
  };

  // ToDo: add habit.completed in database backend query
  return (
    <>
      <h3>{formattedDate}</h3>
      <h3>Did you know?</h3>
      <CardSection>
        <p>{sustainabilityFacts[factIndex].description}</p>
      </CardSection>
      <h3>My habits</h3>
      <CardSection>
        <ul>
          {habits.map((habit: IUserHabit) => (
            <li key={habit._id}>
              {habit.name}
              <span
                onClick={() => toggleCompletion(habit._id)}
                className={`material-symbols-outlined cursor-pointer text-2xl ${
                  habit.completedToday ? "text-green-500" : "text-gray-500"
                }`}
                title={
                  habit.completedToday
                    ? "Mark as incomplete"
                    : "Mark as complete"
                }
              >
                {habit.completedToday
                  ? "check_circle"
                  : "radio_button_unchecked"}
              </span>
            </li>
          ))}
        </ul>
      </CardSection>
      <Link to="/categories">
        <button
          className="fixed bottom-20 right-4 text-fontPrimary rounded-lg px-2 py-2 flex items-center"
          aria-label="Add Habit"
        >
          Add habit
          <span className="material-symbols-outlined text-2xl ml-2">
            add_circle
          </span>
        </button>
      </Link>
    </>
  );
};
