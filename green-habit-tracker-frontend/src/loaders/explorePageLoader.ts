import { getCurrentChallenges } from "../services/challengeService";
import { getCurrentEcotip } from "../services/ecotipService";

export const explorePageLoader = async () => {
  try {
    const challenges = await getCurrentChallenges();
    const ecotip = await getCurrentEcotip();

    return { challenges, ecotip };
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
