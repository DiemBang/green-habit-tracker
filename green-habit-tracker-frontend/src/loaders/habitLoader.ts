import { IHabit } from "../models/IHabit";
import { ILoader } from "../models/ILoader";
import { getHabit } from "../services/habitService";
import { checkIfHabitAlreadyAdded } from "../utils/userHabitUtils";

export const habitLoader = async ({ params }: ILoader) => {
  let identifier = params.identifier ? params.identifier : "";

  let habit: IHabit = await getHabit(identifier);

  let userID = localStorage.getItem("userID") || "";

  let isAlreadyAdded = await checkIfHabitAlreadyAdded(habit.identifier, userID);

  return { habit, isAlreadyAdded };
};
