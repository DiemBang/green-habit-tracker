import { IChallenge } from "../models/IChallenge";
import { ILoader } from "../models/ILoader";
import { getChallenge } from "../services/challengeService";
import { getHabit } from "../services/habitService";
import { checkIfChallengeAlreadyJoined } from "../services/userChallengeService";

export const challengeLoader = async ({ params }: ILoader) => {
  let identifier = params.identifier ? params.identifier : "";

  let challenge: IChallenge = await getChallenge(identifier);

  let challengeID: string = challenge._id;

  let isAlreadyJoined = await checkIfChallengeAlreadyJoined(challengeID);

  let habit = await getHabit(identifier);

  return { challenge, isAlreadyJoined, habit };
};
