import { user } from "../../types/user";
import { db } from "./dbCall";

export const veryficationUserId = async (id: string) => {
  const findUser = await db.getOneUser(id);

  if (!findUser) throw Error("user not found");

  return findUser;
};
