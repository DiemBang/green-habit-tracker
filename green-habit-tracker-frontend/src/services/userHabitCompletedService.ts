import axios from "axios";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted";

const BASE_URL = "http://localhost:3000/api/userHabitsCompleted";

export const getUserHabitsCompleted = async (
  userID: string
): Promise<IUserHabitCompleted> => {
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
