import { IUser } from "../models/IUser";
import { getUser } from "../services/userService";

export const userLoader = async () => {
  let userID = localStorage.getItem("userID") || "";

  let user: IUser = await getUser(userID);
  console.log("user", user);

  return user;
};
