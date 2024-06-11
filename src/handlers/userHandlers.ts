import crypto from "crypto";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import {
  deleteUserReq,
  deleteUserRes,
  getAllUsersReq,
  getAllUsersRes,
  getUserReq,
  getUserRes,
  updateUserReq,
  updateUserRes,
} from "../utils/handlerUserTypes";
import { db } from "../utils/dbCall";
import { user } from "../../types/user";
import { veryficationUserId } from "../utils/verificationUserId";

export const getUsers: ExpressHandlers<getAllUsersReq, getAllUsersRes> = async (
  req,
  res
) => {
  // const user = await veryficationUserId(res.locals.userId);

  const getAllUsersdb = await db.getAllUsers();

  if (!getAllUsersdb)
    return res.status(404).json({ error: "Missing request not users found !" });

  return res.status(200).json({ users: getAllUsersdb });
};

export const getUser: ExpressHandlers<getUserReq, getUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "id user not found" });
  const getUser = await db.getOneUser(id);

  return res.status(200).json({ user: getUser });
};

export const deleteUser: ExpressHandlers<deleteUserReq, deleteUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "id user not found" });
  await db.deleteUsers(id);

  res.status(200).json({ message: "user deleted" });
};

export const updateUser: ExpressHandlers<updateUserReq, updateUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "id user not found" });

  const getUser = await db.getOneUser(id);

  if (!getUser) return res.status(400).json({ message: "user not found" });

  if (
    !req.body.email ||
    !req.body.userName ||
    !req.body.lastName ||
    !req.body.password
  ) {
    return res.status(400).json({ message: "all field is requred" });
  }
  const userUpdated: user = {
    id: getUser.id,
    email: req.body.email,
    userName: req.body.userName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  console.log(userUpdated);

  await db.updateUsers(id, userUpdated);

  return res.status(200).json({ user: userUpdated, message: "user updated" });
};
