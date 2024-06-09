import crypto from "crypto";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import {
  createUserReq,
  createUserRes,
  getAllUsersReq,
  getAllUsersRes,
  getUserReq,
  getUserRes,
} from "../utils/handlerUserTypes";
import { initDb } from "../utils/dbCall";

export const getUsers: ExpressHandlers<getAllUsersRes, getAllUsersReq> = async (
  req,
  res
) => {
  const getAllUsersdb = (await initDb()).getAllUsers();

  return res.status(200).json({ all_Users: await getAllUsersdb });
};

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = async (
  req,
  res
) => {
  const newuser: any = {
    id: crypto.randomUUID(),
    userName: req.body.userName,
    email: req.body.email,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  (await initDb()).addUser(newuser);

  return res.status(200).json({ new_user: newuser });
};

export const getUser: ExpressHandlers<getUserReq, getUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;
  console.log(id);

  if (!id) return res.status(400).json({ message: "id user not found" });
  const getUser = (await initDb()).getOneUser(id);
  console.log(await getUser);

  return res.status(200).json({ user: await getUser });
};
