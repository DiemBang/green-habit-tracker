import { IUser } from "../models/IUser";
import { getUserChallengesCompleted } from "../services/userChallengeCompletedService";
import { getUser } from "../services/userService";

export const profilePageLoader = async () => {
  try {
    const userID = localStorage.getItem("userID") || "";

    const userChallenges = await getUserChallengesCompleted(userID);

    let user: IUser = await getUser(userID);

    return { userChallenges, user };
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
