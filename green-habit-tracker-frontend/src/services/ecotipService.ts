import axios from "axios";
import { IEcotip } from "../models/IEcotip";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/ecotips`;

export const getEcotips = async (): Promise<IEcotip[]> => {
  let response = await axios.get(BASE_URL);

  console.log(response.data);
  return response.data;
};

export const getCurrentEcotip = async (): Promise<IEcotip> => {
  let response = await axios.get(BASE_URL + "/current");

  console.log(response.data);
  return response.data;
};
