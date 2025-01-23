import axios from "axios";
import { IProgressSummary } from "../models/IProgressSummary";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/progressSummary`;

const getProgressSummary = async (userID: string, period: string) => {
  let query = {
    userID: userID,
    period: period,
  };

  let response = await axios.post(BASE_URL, query);

  return response.data;
};

export const progressSummaryLoader = async () => {
  try {
    const userID = localStorage.getItem("userID") || "";
    const progressSummary: IProgressSummary = await getProgressSummary(
      userID,
      "year"
    );

    const streaks = progressSummary.streaks;
    const habitSummary = progressSummary.habitSummary;
    const co2Savings = progressSummary.co2Savings;

    return { streaks, habitSummary, co2Savings };
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
