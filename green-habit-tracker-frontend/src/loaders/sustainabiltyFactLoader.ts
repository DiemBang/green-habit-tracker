import { getFacts } from "../services/sustainabilityFactService";

export const sustainabiltyFactLoader = async () => {
  try {
    const response = await getFacts();
    console.log("Sustainability facts loaded:", response);

    return response;
  } catch (error) {
    console.error("Error loading sustainability facts:", error);
    throw error; // React Router will handle errors appropriately
  }
};
