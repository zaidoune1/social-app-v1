import crypto from "crypto";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import {
  createUserReq,
  createUserRes,
  deleteUserReq,
  deleteUserRes,
  getAllUsersReq,
  getAllUsersRes,
  getUserReq,
  getUserRes,
  updateUserReq,
  updateUserRes,
} from "../utils/handlerUserTypes";
import { initDb } from "../utils/dbCall";
import { user } from "../../types/user";
import { usersDaos } from "../../types/data_methodes/userDao";
import { handelError } from "../utils/handelFilds";

export const getUsers: ExpressHandlers<getAllUsersRes, getAllUsersReq> = async (
  req,
  res
) => {
  const db: usersDaos = await initDb();

  const getAllUsersdb = await db.getAllUsers();

  return res.status(200).json({ all_Users: getAllUsersdb });
};

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = async (
  req,
  res
) => {
  const handelFileds = handelError(req.body);

  if (handelFileds.length > 0)
    return res.status(400).json({
      message: `all this  field is requred ${handelFileds.join(" and ")}`,
    });

  const newuser: any = {
    id: crypto.randomUUID(),
    userName: req.body.userName,
    email: req.body.email,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  const db: usersDaos = await initDb();

  await db.addUser(newuser);

  return res.status(200).json({
    new_user: newuser,
    message: "user created",
  });
};

export const getUser: ExpressHandlers<getUserReq, getUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;

  const db: usersDaos = await initDb();

  if (!id) return res.status(400).json({ message: "id user not found" });
  const getUser = db.getOneUser(id);

  return res.status(200).json({ user: getUser });
};

export const deleteUser: ExpressHandlers<deleteUserReq, deleteUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "id user not found" });
  const db: usersDaos = await initDb();
  await db.deleteUsers(id);

  res.status(200).json({ message: "user deleted" });
};

export const updateUser: ExpressHandlers<updateUserReq, updateUserRes> = async (
  req,
  res
) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "id user not found" });

  const db: usersDaos = await initDb();

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
