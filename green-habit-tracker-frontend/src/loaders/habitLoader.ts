import { IHabit } from "../models/IHabit";
import { ILoader } from "../models/ILoader";
import { getHabit } from "../services/habitService";

export const habitLoader = async ({ params }: ILoader) => {
  let identifier = params.identifier ? params.identifier : "";

  let habit: IHabit = await getHabit(identifier);
  console.log("habit", habit);

  return habit;
};
