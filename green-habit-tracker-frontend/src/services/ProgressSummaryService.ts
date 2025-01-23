import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/progressSummary`;

export const getProgressSummary = async (userID: string, period: string) => {
  let query = {
    userID: userID,
    period: period,
  };

  let response = await axios.post(BASE_URL, query);

  return response.data;
};
