import { IHabitType } from "../models/IHabitType";
import { ILoader } from "../models/ILoader";
import {
  getHabitTypes,
  getHabitTypesFiltered,
} from "../services/habitTypeService";

export const habitsPerCategoryPageLoader = async ({ params }: ILoader) => {
  let category = params.category ? params.category : "";
  let habitTypes: Array<IHabitType> = [];
  if (category === "All") {
    habitTypes = await getHabitTypes();
  } else {
    habitTypes = await getHabitTypesFiltered(category);
  }

  return habitTypes;
};
