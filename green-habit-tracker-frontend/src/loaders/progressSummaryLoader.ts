import { IProgressSummary } from "../models/IProgressSummary";
import { getProgressSummary } from "../services/ProgressSummaryService";

export const progressSummaryLoader = async () => {
  try {
    const userID = localStorage.getItem("userID") || "";
    const progressSummary: IProgressSummary = await getProgressSummary(
      userID,
      "month"
    );

    return progressSummary;
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
