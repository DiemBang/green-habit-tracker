import { IChallenge } from "../models/IChallenge";
import { ILoader } from "../models/ILoader";
import { getChallenge } from "../services/challengeService";

export const challengeLoader = async ({ params }: ILoader) => {
  let identifier = params.identifier ? params.identifier : "";

  let challenge: IChallenge = await getChallenge(identifier);
  console.log("challenge", challenge);

  return challenge;
};
