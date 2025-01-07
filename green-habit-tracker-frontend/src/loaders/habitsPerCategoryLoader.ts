import { IHabitType } from "../models/IHabitType";
import { ILoader } from "../models/ILoader";
import {
  getHabitTypes,
  getHabitTypesFiltered,
} from "../services/habitTypeService";

export const habitsPerCategoryPageLoader = async ({ params }: ILoader) => {
  const category = params.category ? params.category : "";

  const habitTypes: Array<IHabitType> = await getHabitTypesFiltered(category);

  return habitTypes;
};
