import { IHabitType } from "../models/IHabitType";
import { getHabitTypes } from "../services/habitTypeService";

export const habitsPerCategoryPageLoader = async () => {
  const habitTypes: Array<IHabitType> = await getHabitTypes();

  return habitTypes;
};
