import { IHabitType } from "../models/IHabitType";

interface HabitProps {
  habitType: IHabitType;
}

export const HabitButton = ({ habitType }: HabitProps) => {
  return (
    <article
      key={habitType._id}
      className="mb-2 p-0 border rounded-lg shadow-sm"
    >
      <h3 className="inline-flex items-center text-base ml-2">
        {habitType.Name}
      </h3>
      <span className="material-symbols-outlined text-base ml-2 align-middle">
        add
      </span>
    </article>
  );
};
