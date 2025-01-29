import { IHabit } from "../models/IHabit";
import { ILoader } from "../models/ILoader";
import { IUserHabit } from "../models/IUserHabit";
import { getHabits, getHabitsFiltered } from "../services/habitService";
import { getUserHabits } from "../services/userHabitService";

export const habitsPerCategoryPageLoader = async ({ params }: ILoader) => {
  let category = params.category ? params.category : "";
  let habitTypes: Array<IHabit> = [];
  if (category === "All") {
    habitTypes = await getHabits();
  } else {
    habitTypes = await getHabitsFiltered(category);
  }
  const userID = localStorage.getItem("userID") || "";
  const existingHabits: IUserHabit[] = await getUserHabits(userID);
  const existingHabitIdentifiers: string[] = []; // Should be e.g. ["LightsOff", ...]

  existingHabits.forEach((existingHabit) => {
    existingHabitIdentifiers.push(existingHabit.habitIdentifier);
  });

  return { habitTypes, existingHabitIdentifiers };
};
