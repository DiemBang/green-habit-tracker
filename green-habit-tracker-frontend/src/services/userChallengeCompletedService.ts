import axios from "axios";
import { IUserChallengeCompleted } from "../models/IUserChallengeCompleted";

const BASE_URL = `${
  import.meta.env.VITE_BACKEND_BASE_URL
}/api/userChallengesCompleted`;

export const getUserChallengesCompleted = async (
  userID: string
): Promise<IUserChallengeCompleted> => {
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
