import { IUser } from "../models/IUser";
import { getUser } from "../services/userService";

export const userLoader = async () => {
  let userID = localStorage.getItem("userID") || "";

  let user: IUser = await getUser(userID);

  return user;
};
