import axios from "axios";
import { IUser } from "../models/IUser";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users`;

export const getUser = async (userID: string): Promise<IUser> => {
  let query = { _id: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
