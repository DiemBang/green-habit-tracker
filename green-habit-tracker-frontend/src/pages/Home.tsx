import { Link, useLoaderData } from "react-router-dom";
import { IUserHabit } from "../models/IUserHabit";
import { useEffect, useState } from "react";
import { addUserHabitCompletedForUser } from "../services/userHabitCompletedService";
import { CardSection } from "../components/CardSection";
import { useCalendar } from "../contexts/CalendarContext";
import { HabitTodo } from "../components/HabitTodo";
import { getUserHabitsWithCompletedStatusByDay } from "../services/userHabitService";

export const Home = () => {
  const { sustainabilityFacts, userHabits } = useLoaderData();
  const [habits, setHabits] = useState(userHabits);
  const { selectedDate } = useCalendar();

  // 1. Add a useEffect function to listen for when selected date changes
  // 2. In the useEffect, call the getUserHabitsWithCompletedStatusByDay
  //  function with the new selected date to get the correct statuses in
  //  a userHabits list
  // 3. call setHabits with the new userHabits

  let userID = localStorage.getItem("userID") || "";

  useEffect(() => {
    const getUserHabitsForNewSelectedDay = async () => {
      let day = selectedDate.toISOString();
      if (selectedDate) {
        console.log("Selected date changed:", selectedDate);
        const userHabits = await getUserHabitsWithCompletedStatusByDay(
          userID,
          day
        );
        console.log("userHabits", userHabits);
        setHabits(userHabits);
      }
    };
    getUserHabitsForNewSelectedDay();
  }, [selectedDate]); // Only runs when selectedDate changes

  const formattedDate = selectedDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate the index for today's fact
  const today = new Date();
  const factIndex = today.getDate() % sustainabilityFacts.length; // Ensures index wraps around

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
      <h3>Habits to complete</h3>
      <CardSection>
        <ul>
          {habits.map((habit: IUserHabit) => (
            <HabitTodo
              habit={habit}
              toggleCompletion={toggleCompletion}
              key={habit._id}
            ></HabitTodo>
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
