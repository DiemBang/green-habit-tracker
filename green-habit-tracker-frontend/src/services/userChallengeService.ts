import axios from "axios";
import { IUserChallenge } from "../models/IUserChallenge";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/userChallenges`;

export const getChallengesForSpecificUser = async (): Promise<
  IUserChallenge[]
> => {
  let userID = localStorage.getItem("userID") || "";
  let query = { userID: userID };
  let response = await axios.post(BASE_URL, query);

  return response.data;
};

export const getChallengesForSpecificUserWithNoEndDate = async (): Promise<
  IUserChallenge[]
> => {
  let userID = localStorage.getItem("userID") || "";
  let query = { userID: userID };
  let response = await axios.post(BASE_URL + "/noEndDate", query);

  return response.data;
};

export const checkIfChallengeAlreadyJoined = async (
  challengeID: string
): Promise<boolean> => {
  const joinedChallenges = await getChallengesForSpecificUser();
  // Check if the challenge already exists
  const isChallengeAlreadyJoined = joinedChallenges.some(
    (c: { challengeID: string }) => c.challengeID === challengeID
  );
  return isChallengeAlreadyJoined;
};
