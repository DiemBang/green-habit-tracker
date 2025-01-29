import { useLoaderData, useParams } from "react-router-dom";
import { IHabit } from "../models/IHabit";
import { HabitButton } from "../components/HabitButton";

export const HabitsPerCategory = () => {
  const {
    habitTypes,
    existingHabitIdentifiers,
  }: { habitTypes: IHabit[]; existingHabitIdentifiers: string[] } =
    useLoaderData();
  let { category } = useParams();

  return (
    <>
      <section className="mb-20">
        <h2>{category}</h2>
        {habitTypes.map((habitType) => (
          <HabitButton
            key={habitType._id}
            habitType={habitType}
            isAlreadyAdded={existingHabitIdentifiers.includes(
              habitType.identifier
            )}
          ></HabitButton>
        ))}
      </section>
    </>
  );
};
