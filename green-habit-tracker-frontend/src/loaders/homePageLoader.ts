import { getFacts } from "../services/sustainabilityFactService";
import { getChallengesForSpecificUserWithNoEndDate } from "../services/userChallengeService";
import { getUserHabitsWithCompletedStatusByDay } from "../services/userHabitService";

export const homePageLoader = async () => {
  try {
    const sustainabilityFacts = await getFacts();
    const userID = localStorage.getItem("userID") || "";
    const day = new Date().toISOString();
    const userHabits = await getUserHabitsWithCompletedStatusByDay(userID, day);

    const userChallenges = await getChallengesForSpecificUserWithNoEndDate();

    // Initialize an empty dictionary
    let challengeDict: { [key: string]: boolean } = {};

    // Use a for loop to populate the dictionary
    for (const challenge of userChallenges) {
      challengeDict[challenge.habitIdentifier] = true;
    }

    return { sustainabilityFacts, userHabits, challengeDict };
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
