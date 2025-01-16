import axios from "axios";
import { IUser } from "../models/IUser";

const BASE_URL = "http://localhost:3000/api/users";

export const getUser = async (userID: string): Promise<IUser> => {
  let query = { _id: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
