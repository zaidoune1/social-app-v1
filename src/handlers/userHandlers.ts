import crypto from "crypto";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { handelError } from "../utils/handelFilds";
import {
  createUserReq,
  createUserRes,
  getAllUsersReq,
  getAllUsersRes,
} from "../utils/handlerUserTypes";
import { initDb } from "../utils/dbCall";

export const getAllUsers: ExpressHandlers<
  getAllUsersRes,
  getAllUsersReq
> = async (req, res) => {
  const getAllUsersdb = (await initDb()).getAllUsers();
  return res.status(200).json({ all_Users: getAllUsersdb });
};

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = async (
  req,
  res
) => {
  const emptyFiled = handelError(req.body);

  if (emptyFiled)
    return res.status(400).json({
      error: `Missing user data`,
      message: emptyFiled.length > 0 ? emptyFiled : "bad request",
    });

  const newuser: any = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  (await initDb()).addUser(newuser);

  return res.status(200).json({ new_user: newuser });
};
