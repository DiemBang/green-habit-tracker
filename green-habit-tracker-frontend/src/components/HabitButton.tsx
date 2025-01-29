import { Link } from "react-router-dom";
import { IHabit } from "../models/IHabit";
import addIcon from "/src/assets/add2.svg";
import alreadyAddedIcon from "/src/assets/check-mark.svg";

interface HabitProps {
  habitType: IHabit;
  isAlreadyAdded: boolean;
}

export const HabitButton = ({ habitType, isAlreadyAdded }: HabitProps) => {
  return (
    <article
      key={habitType.identifier}
      className="mb-2 border rounded-lg shadow-sm bg-cardWhite lg:w-[50%]"
    >
      <Link
        to={`/habit/${habitType.identifier}`}
        className="flex items-center justify-between w-full px-3 text-customGreen hover:underline"
      >
        <h4 className="text-sm mt-2 mb-2">{habitType.name}</h4>
        <img
          src={isAlreadyAdded ? alreadyAddedIcon : addIcon}
          alt="Add Icon"
          className="w-5 h-5 ml-2"
        />
      </Link>
    </article>
  );
};
