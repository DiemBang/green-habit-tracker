import { useLoaderData } from "react-router-dom";
import { IHabitType } from "../models/IHabitType";
import { HabitButton } from "../components/HabitButton";

export const HabitsPerCategory = () => {
  // TODO:
  // 3. Get category from URL paremeter
  // 4. In backend, allow filtering habit type by category
  // 5. Use category from URL parameter to filter habit types
  const habitTypes = useLoaderData() as IHabitType[];

  return (
    <>
      <h2>Habits per Category</h2>
      {habitTypes.map((habitType) => (
        <HabitButton key={habitType._id} habitType={habitType}></HabitButton>
      ))}
    </>
  );
};
