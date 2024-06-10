import { ExpressHandlers } from "../utils/ExpressHandlers";
import { accessToken } from "../utils/auth";
import { db } from "../utils/dbCall";
import { handelError } from "../utils/handelFields";
import {
  AuthReq,
  AuthRes,
  createUserReq,
  createUserRes,
  userObj,
} from "../utils/handlerUserTypes";

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = async (
  req,
  res
) => {
  const handelFileds = handelError(req.body);

  if (handelFileds.length > 0)
    return res.status(400).json({
      error: `all this  field is required ${handelFileds.join(" and ")}`,
    });

  const newuser: any = {
    id: crypto.randomUUID(),
    userName: req.body.userName,
    email: req.body.email,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  if (await db.getUserByEmail(newuser.email))
    return res.status(400).json({ error: "user already exisit" });

  await db.addUser(newuser);

  const tokenAccess = accessToken({ id: newuser.id });

  return res.status(200).json({
    tokenAccess,
    message: "user created",
  });
};

export const login: ExpressHandlers<AuthReq, AuthRes> = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(403).json({ message: "all this fields required" });
  const findUser = await db.getUserByEmail(email);
  if (!findUser) return res.status(400).json({ message: "user not found" });

  if (password !== findUser.password)
    return res.status(403).json({ message: " incorrect password" });

  const tokenAccess = process.env.TOKEN_ACCESS;
  if (!tokenAccess) {
    throw new Error("TOKEN_ACCESS is not defined in the .env file");
  }

  const userObj: userObj = {
    userName: findUser.userName,
    lastName: findUser.lastName,
    email: findUser.email,
  };

  const secretToken = accessToken({ id: findUser.id });

  return res.status(200).json({ user: userObj, secretToken });
};
