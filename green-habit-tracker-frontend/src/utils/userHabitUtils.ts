import { getUserHabits } from "../services/userHabitService";

export const checkIfHabitAlreadyAdded = async (
  habitIdentifier: string,
  userID: string
): Promise<boolean> => {
  const existingHabits = await getUserHabits(userID);
  // Check if the habit already exists
  const isHabitAlreadyAdded = existingHabits.some(
    (h: { habitIdentifier: string }) => h.habitIdentifier === habitIdentifier
  );
  return isHabitAlreadyAdded;
};
