import axios from "axios";
import { IHabit } from "../models/IHabit";

const BASE_URL = "http://localhost:3000/api/habits";

export const getHabits = async () => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};

export const getHabitsFiltered = async (category: string) => {
  let response = await axios.get(BASE_URL, { params: { category: category } });

  console.log(response.data);
  return response.data;
};

export const getHabit = async (identifier: string): Promise<IHabit> => {
  let query = { identifier: identifier };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
