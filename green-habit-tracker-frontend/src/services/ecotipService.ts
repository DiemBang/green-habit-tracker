import axios from "axios";
import { IEcotip } from "../models/IEcotip";

const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/ecotips`;

export const getEcotips = async (): Promise<IEcotip[]> => {
  let response = await axios.get(BASE_URL);

  return response.data;
};

export const getCurrentEcotip = async (): Promise<IEcotip> => {
  let response = await axios.get(BASE_URL + "/current");

  return response.data;
};
