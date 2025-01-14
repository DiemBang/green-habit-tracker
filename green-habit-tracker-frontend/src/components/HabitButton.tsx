import { Link } from "react-router-dom";
import { IHabit } from "../models/IHabit";
import addIcon from "/src/assets/add2.svg";

interface HabitProps {
  habitType: IHabit;
}

export const HabitButton = ({ habitType }: HabitProps) => {
  return (
    <article
      key={habitType.identifier}
      className="w-[95%] mb-2 p-0 border rounded-lg shadow-sm flex items-center justify-between"
    >
      <Link
        to={`/habit/${habitType.identifier}`}
        className="flex items-center justify-between w-full p-2 text-green-600 hover:underline"
      >
        <h3 className="text-base ml-2">{habitType.name}</h3>
        <img
          src={addIcon}
          alt="Add Icon"
          className="w-4 h-4 ml-2 align-middle"
        />
      </Link>
    </article>
  );
};
