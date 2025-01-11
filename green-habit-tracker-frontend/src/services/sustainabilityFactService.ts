import axios from "axios";
import { ISustainabilityFact } from "../models/ISustainabilityFact";

const BASE_URL = "http://localhost:3000/api/sustainabilityFacts";

export const getFacts = async (): Promise<ISustainabilityFact[]> => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};
