import { getFacts } from "../services/sustainabilityFactService";
import { getUserHabitsWithCompletedStatusByDay } from "../services/userHabitService";

export const homePageLoader = async () => {
  try {
    const sustainabilityFacts = await getFacts();
    const userID = localStorage.getItem("userID") || "";
    const day = new Date().toISOString();
    const userHabits = await getUserHabitsWithCompletedStatusByDay(userID, day);

    console.log("Sustainability facts loaded:", sustainabilityFacts);

    return { sustainabilityFacts, userHabits };
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
