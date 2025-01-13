import axios from "axios";
import { IChallenge } from "../models/IChallenge";

const BASE_URL = "http://localhost:3000/api/challenges";

export const getChallenges = async (): Promise<IChallenge[]> => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};

export const getCurrentChallenges = async (): Promise<IChallenge[]> => {
  let response = await axios.get(BASE_URL + "/current");

  console.log(response.data);
  return response.data;
};
