import axios from "axios";
import { IUserHabit } from "../models/IUserHabit";

const BASE_URL = "http://localhost:3000/api/userHabits";

export const getUserHabits = async (userID: string): Promise<IUserHabit> => {
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};

export const getUserHabitsWithCompletedTodayStatus = async (
  userID: string
): Promise<IUserHabit> => {
  let query = { userID: userID };
  let response = await axios.post(
    BASE_URL + "/withCompletedTodayStatus",
    query
  );
  return response.data;
};

export const getUserHabitsWithCompletedStatusByDay = async (
  userID: string,
  day: string
): Promise<IUserHabit> => {
  let query = { userID: userID, day: day };
  let response = await axios.post(
    BASE_URL + "/withCompletedStatusByDay",
    query
  );
  return response.data;
};
