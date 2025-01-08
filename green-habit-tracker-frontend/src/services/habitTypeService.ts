import axios from "axios";

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
