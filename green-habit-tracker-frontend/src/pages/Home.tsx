import { Link, useLoaderData } from "react-router-dom";
import { IUserHabit } from "../models/IUserHabit";
import { useEffect, useState } from "react";
import { addUserHabitCompletedForUser } from "../services/userHabitCompletedService";
import { CardSection } from "../components/CardSection";
import { useCalendar } from "../contexts/CalendarContext";
import { HabitTodo } from "../components/HabitTodo";
import { getUserHabitsWithCompletedStatusByDay } from "../services/userHabitService";
import didYouKnowIcon from "../assets/know.svg";

export const Home = () => {
  const { sustainabilityFacts, userHabits, challengeDict } = useLoaderData();
  const [habits, setHabits] = useState(userHabits);
  const { selectedDate, setSelectedDate } = useCalendar();

  // 1. Add a useEffect function to listen for when selected date changes
  // 2. In the useEffect, call the getUserHabitsWithCompletedStatusByDay
  //  function with the new selected date to get the correct statuses in
  //  a userHabits list
  // 3. call setHabits with the new userHabits

  let userID = localStorage.getItem("userID") || "";

  const getUserHabitsForNewSelectedDay = async () => {
    let day = selectedDate.toISOString();
    if (selectedDate) {
      const userHabits = await getUserHabitsWithCompletedStatusByDay(
        userID,
        day
      );

      setHabits(userHabits);
    }
  };

  // Set selected date to current day when loading page
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
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
        await addUserHabitCompletedForUser(
          habit.userID,
          habit.habitIdentifier,
          habit.name
        );
        getUserHabitsForNewSelectedDay();
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
      <h2>{formattedDate}</h2>
      <div className="flex flex-col lg:flex-row-reverse w-[100%]">
        <div className="lg:w-[40%] lg:m-6">
          <img src={didYouKnowIcon} alt="Did you know icon" width="80" />
          <CardSection className="mt-[-0.375rem]">
            <p>{sustainabilityFacts[factIndex].description}</p>
          </CardSection>
          <Link to="/categories">
            <button
              className="hidden lg:flex font-bold capitalize rounded-lg px-2 py-2 items-center"
              aria-label="Add Habit"
            >
              Add habit
              <span className="material-symbols-outlined text-2xl ml-2">
                add_circle
              </span>
            </button>
          </Link>
        </div>
        <div className="lg:w-[60%]">
          <h3>Habits to complete</h3>
          <CardSection className="mb-20">
            <ul>
              {habits.map((habit: IUserHabit) => (
                <HabitTodo
                  habit={habit}
                  toggleCompletion={toggleCompletion}
                  key={habit._id}
                  challenge={challengeDict[habit.habitIdentifier]}
                ></HabitTodo>
              ))}
            </ul>
          </CardSection>
        </div>
      </div>

      <Link to="/categories">
        <button
          className="lg:hidden fixed bottom-20 right-4 lg:right-[16.75rem] max-w-[calc(100%-1rem)] text-black font-bold capitalize rounded-lg px-2 py-2 flex items-center"
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
