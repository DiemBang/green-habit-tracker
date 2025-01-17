import { useLoaderData, useParams } from "react-router-dom";
import { IHabit } from "../models/IHabit";
import { HabitButton } from "../components/HabitButton";

export const HabitsPerCategory = () => {
  const habitTypes = useLoaderData() as IHabit[];
  let { category } = useParams();

  return (
    <>
      <h2>{category}</h2>
      {habitTypes.map((habitType) => (
        <HabitButton key={habitType._id} habitType={habitType}></HabitButton>
      ))}
    </>
  );
};
