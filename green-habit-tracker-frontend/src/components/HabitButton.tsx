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
      className="mb-2 border rounded-lg shadow-sm bg-cloudWhite"
    >
      <Link
        to={`/habit/${habitType.identifier}`}
        className="flex items-center justify-between w-full px-3 text-green-600 hover:underline"
      >
        <h4 className="text-sm mt-2 mb-2">{habitType.name}</h4>
        <img src={addIcon} alt="Add Icon" className="w-5 h-5 ml-2" />
      </Link>
    </article>
  );
};
