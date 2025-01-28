import { useLoaderData, useParams } from "react-router-dom";
import { IHabit } from "../models/IHabit";
import { HabitButton } from "../components/HabitButton";

export const HabitsPerCategory = () => {
  const habitTypes = useLoaderData() as IHabit[];
  let { category } = useParams();

  return (
    <>
      <section className="mb-20">
        <h3>{category}</h3>
        {habitTypes.map((habitType) => (
          <HabitButton key={habitType._id} habitType={habitType}></HabitButton>
        ))}
      </section>
    </>
  );
};
