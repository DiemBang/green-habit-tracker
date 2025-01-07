import { IHabitType } from "../models/IHabitType";

interface HabitProps {
  habitType: IHabitType;
}

export const Habit = ({ habitType }: HabitProps) => {
  return (
    <>
      <section className="mb-4 p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">{habitType.Name}</h3>
        <button>
          <span className="material-symbols-outlined">add</span>
          Add
        </button>
        <p>{habitType.Co2EmissionKgPerAction}</p>
        <p>{habitType.Points}</p>
        <p className="text-gray-600">{habitType.Description}</p>
        <article>
          <h4>Good to know</h4>
          <p>{habitType.GoodToKnow}</p>
        </article>
      </section>
      <section>
        <p>Frequency</p>
        <p>Reminder time</p>
        <p>Start and end dates</p>
      </section>
    </>
  );
};
