import axios from "axios";
import { IHabit } from "../models/IHabit";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/habits`;

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
