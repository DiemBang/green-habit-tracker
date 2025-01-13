import { getCurrentChallenges } from "../services/challengeService";

export const explorePageLoader = async () => {
  try {
    const challenges = await getCurrentChallenges();

    console.log("Challenges loaded:", challenges);

    return { challenges };
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
