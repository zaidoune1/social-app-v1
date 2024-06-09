import { db } from "../../memoryDb/getDaos";
import crypto from "crypto";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { handelError } from "../utils/handelFilds";
import {
  createUserReq,
  createUserRes,
  getAllUsersReq,
  getAllUsersRes,
} from "../utils/handlerUserTypes";

export const getAllUsers: ExpressHandlers<getAllUsersRes, getAllUsersReq> = (
  req,
  res
) => {
  const getAllUsersdb = db.getAllUsers();
  return res.status(200).json({ all_Users: getAllUsersdb });
};

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = (
  req,
  res
) => {
  const emptyFiled = handelError(req.body);

  if (emptyFiled)
    return res
      .status(400)
      .json({ error: `Missing user data`, message: emptyFiled });

  const newuser: any = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  db.addUser(newuser);

  return res.status(200).json({ new_user: newuser });
};
