import { useLoaderData } from "react-router-dom";
import { IHabitType } from "../models/IHabitType";

export const HabitsPerCategory = () => {
  // TODO:
  // 1. Fetch HabitTypes (from loader that calls services file)
  // a. create category service file
  // b. create category loader file
  // c. install axios
  // 2. Display HabitTypes (one div per habit)
  // 3. Get category from URL paremeter
  // 4. In backend, allow filtering habit type by category
  // 5. Use category from URL parameter to filter habit types
  const habitTypes = useLoaderData() as IHabitType[];

  return (
    <>
      <h2>Habits per Category</h2>
      {habitTypes.map((habitType) => (
        <article key={habitType.Id}>
          <h3>{habitType.Name}</h3>
          <p></p>
        </article>
      ))}
    </>
  );
};
