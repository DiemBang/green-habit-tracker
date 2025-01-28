import { IChallenge } from "../models/IChallenge";
import { ILoader } from "../models/ILoader";
import { getChallenge } from "../services/challengeService";
import { getHabit } from "../services/habitService";
import { checkIfChallengeAlreadyJoined } from "../services/userChallengeService";

export const challengeLoader = async ({ params }: ILoader) => {
  let identifier = params.identifier ? params.identifier : "";

  let challenge: IChallenge = await getChallenge(identifier);
  console.log("challenge", challenge);

  let challengeID: string = challenge._id;
  console.log(challengeID);
  let isAlreadyJoined = await checkIfChallengeAlreadyJoined(challengeID);
  console.log(isAlreadyJoined);
  let habit = await getHabit(identifier);

  return { challenge, isAlreadyJoined, habit };
};
