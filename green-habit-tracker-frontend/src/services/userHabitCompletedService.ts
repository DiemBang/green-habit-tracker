import axios from "axios";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted";

const BASE_URL = `${
  import.meta.env.VITE_BACKEND_BASE_URL
}/api/userHabitsCompleted`;

export const getUserHabitsCompleted = async (
  userID: string
): Promise<IUserHabitCompleted> => {
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};

export const addUserHabitCompletedForUser = async (
  userID: string,
  habitIdentifier: string,
  name: string
): Promise<IUserHabitCompleted> => {
  let query = { userID: userID, habitIdentifier: habitIdentifier, name: name };
  let response = await axios.post(BASE_URL + "/add", query);
  return response.data;
};
