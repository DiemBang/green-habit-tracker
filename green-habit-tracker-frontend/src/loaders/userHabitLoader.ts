import axios from "axios";
import { IUserHabit } from "../models/IUserHabit";

const BASE_URL = "http://localhost:3000/api/userHabits";

export const getuserHabit = async (): Promise<IUserHabit> => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};
