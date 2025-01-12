import axios from "axios";
import { IChallenge } from "../models/IChallenge";

const BASE_URL = "http://localhost:3000/api/challenges";

export const getFacts = async (): Promise<IChallenge[]> => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};
