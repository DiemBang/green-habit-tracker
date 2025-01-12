import { Link, useLoaderData } from "react-router-dom";
import { IUserHabit } from "../models/IUserHabit";
import { useState } from "react";

export const Home = () => {
  const { sustainabilityFacts, userHabits } = useLoaderData();
  const [habits, setHabits] = useState(userHabits);

  // Calculate the index for today's fact
  const today = new Date();
  const factIndex = today.getDate() % sustainabilityFacts.length; // Ensures index wraps around

  // WIP: Toggle habit completion
  const toggleCompletion = (id: string) => {
    const updatedHabits = habits.map((habit: IUserHabit) =>
      habit._id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  // ToDo: add habit.completed in database backend query
  return (
    <>
      <h2 className="text-green-600">What's on?</h2>
      <h3>Did you know?</h3>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <p>{sustainabilityFacts[factIndex].description}</p>
      </section>
      <h3>Today's habits</h3>
      <section className="w-[95%] mx-auto mb-6 p-6 bg-white border rounded-lg shadow-md">
        <ul>
          {userHabits.map((habit: IUserHabit) => (
            <li key={habit._id}>
              {habit.name}
              <span
                onClick={() => toggleCompletion(habit._id)}
                className={`material-symbols-outlined cursor-pointer text-2xl ${
                  habit.completed ? "text-green-500" : "text-gray-500"
                }`}
                title={
                  habit.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {habit.completed ? "check_circle" : "radio_button_unchecked"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Link to="/categories">
        <button
          className="fixed bottom-20 right-4 bg-green-500 text-white rounded-lg px-2 py-2 flex items-center"
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
