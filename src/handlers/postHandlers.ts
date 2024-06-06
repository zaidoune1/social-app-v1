import { RequestHandler } from "express";
import { db } from "../../inMemoryDb/getDaos";
import { user } from "../../types/user";
import crypto from "crypto";
import { ExpressHandlers } from "../types";

export const getAllUsers: ExpressHandlers<{}, {}> = (req, res) => {
  const getAllUsersdb = db.getAllUsers();
  return res.status(200).json({ all_Users: getAllUsersdb });
};

type createUserRes = {};
type createUserReq = Pick<user, "email" | "name" | "password">;

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = (
  req,
  res
) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    return res.status(400).json({ error: "Missing user data" });
  }

  const newuser = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  db.addUser(newuser);

  return res.status(200).json({ new_user: newuser });
};
