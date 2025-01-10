import { Link } from "react-router-dom";
import { IHabit } from "../models/IHabit";

interface HabitProps {
  habitType: IHabit;
}

export const HabitButton = ({ habitType }: HabitProps) => {
  return (
    <article
      key={habitType.identifier}
      className="mb-2 p-0 border rounded-lg shadow-sm flex items-center justify-between"
    >
      <Link
        to={`/habit/${habitType.identifier}`}
        className="flex items-center justify-between w-full p-2 text-green-600 hover:underline"
      >
        <h3 className="text-base ml-2">{habitType.name}</h3>
        <span className="material-symbols-outlined text-base ml-2 align-middle">
          add
        </span>
      </Link>
    </article>
  );
};
