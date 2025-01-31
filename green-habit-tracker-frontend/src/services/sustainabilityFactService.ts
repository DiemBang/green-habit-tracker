import axios from "axios";
import { ISustainabilityFact } from "../models/ISustainabilityFact";

const BASE_URL = `${
  import.meta.env.VITE_BACKEND_BASE_URL
}/api/sustainabilityFacts`;

export const getFacts = async (): Promise<ISustainabilityFact[]> => {
  let response = await axios.get(BASE_URL);

  return response.data;
};
