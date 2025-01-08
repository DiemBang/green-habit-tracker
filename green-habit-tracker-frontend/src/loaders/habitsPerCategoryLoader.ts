import { IHabitType } from "../models/IHabitType";
import { ILoader } from "../models/ILoader";
import { getHabits, getHabitsFiltered } from "../services/habitTypeService";

export const habitsPerCategoryPageLoader = async ({ params }: ILoader) => {
  let category = params.category ? params.category : "";
  let habitTypes: Array<IHabitType> = [];
  if (category === "All") {
    habitTypes = await getHabits();
  } else {
    habitTypes = await getHabitsFiltered(category);
  }

  return habitTypes;
};
