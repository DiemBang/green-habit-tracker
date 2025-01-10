import { IHabit } from "../models/IHabit";
import { ILoader } from "../models/ILoader";
import { getHabits, getHabitsFiltered } from "../services/habitService";

export const habitsPerCategoryPageLoader = async ({ params }: ILoader) => {
  let category = params.category ? params.category : "";
  let habitTypes: Array<IHabit> = [];
  if (category === "All") {
    habitTypes = await getHabits();
  } else {
    habitTypes = await getHabitsFiltered(category);
  }

  return habitTypes;
};
