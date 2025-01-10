import { useLoaderData } from "react-router-dom";
import { IHabit } from "../models/IHabit";

export const HabitPage = () => {
  const habit = useLoaderData() as IHabit;

  return (
    <>
      <section className="mb-4 p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">{habit.Name}</h3>
        <button>
          <span className="material-symbols-outlined">add</span>
          Add
        </button>
        <p>{habit.Co2EmissionKgPerAction}</p>
        <p>{habit.Points}</p>
        <p className="text-gray-600">{habit.Description}</p>
        <article>
          <h4>Good to know</h4>
          <p>{habit.GoodToKnow}</p>
        </article>
      </section>
      <section>
        <h4>Frequency</h4>
        <h4>Reminder time</h4>
      </section>
    </>
  );
};
