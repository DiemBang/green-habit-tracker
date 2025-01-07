import axios from "axios";

const BASE_URL = "http://localhost:3000/api/habitTypes";

export const getHabitTypes = async () => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};

export const getHabitTypesFiltered = async (category: string) => {
  let response = await axios.get(BASE_URL, { params: { category: category } });

  console.log(response.data);
  return response.data;
};
