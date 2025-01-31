import axios from "axios";
import { IChallenge } from "../models/IChallenge";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/challenges`;

export const getChallenges = async (): Promise<IChallenge[]> => {
  let response = await axios.get(BASE_URL);

  return response.data;
};

export const getCurrentChallenges = async (): Promise<IChallenge[]> => {
  let response = await axios.get(BASE_URL + "/current");

  return response.data;
};

export const getChallenge = async (identifier: string): Promise<IChallenge> => {
  let query = { habitIdentifier: identifier };
  let response = await axios.post(BASE_URL, query);
  return response.data;
};
