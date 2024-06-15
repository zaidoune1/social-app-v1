import { user } from "../../types/user";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { RefreshToken, accessToken } from "../utils/auth";
import { bcryptPasswordHash, comparePassword } from "../utils/bcrypt";
import { db } from "../utils/dbCall";
import { handelError } from "../utils/handelFields";
import { RefreshTokenReq, RefreshTokenRes } from "../utils/handlerTokenTypes";
import jwt from "jsonwebtoken";
import {
  AuthReq,
  AuthRes,
  LogoutReq,
  LogoutRes,
  createUserReq,
  createUserRes,
  userObj,
} from "../utils/handlerUserTypes";
import { veryficationUserId } from "../utils/verificationUserId";

let refreshTokens = []; // Stockage temporaire des refresh tokens
let blacklistedAccessTokens = new Set();

export const userAdd: ExpressHandlers<createUserReq, createUserRes> = async (
  req,
  res
) => {
  const handelFileds = handelError(req.body);

  if (handelFileds.length > 0)
    return res.status(400).json({
      error: `all this  field is required ${handelFileds.join(" and ")}`,
    });

  const passwordHash = await bcryptPasswordHash(req.body.password as string);

  if (!passwordHash) throw Error("password probleme");

  const newuser: any = {
    id: crypto.randomUUID(),
    userName: req.body.userName,
    email: req.body.email,
    lastName: req.body.lastName,
    password: passwordHash,
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

  const isValidPassword = await comparePassword(password, findUser.password);

  if (!isValidPassword)
    return res.status(403).json({ message: " incorrect password" });

  const userObj: userObj = {
    userName: findUser.userName,
    lastName: findUser.lastName,
    email: findUser.email,
  };

  const secretToken = accessToken({ id: findUser.id });

  if (blacklistedAccessTokens.has(secretToken))
    return res.status(400).json({ error: "bad request please login " });

  const secretRefreshToken = RefreshToken({ id: findUser.id });

  const refreshToken = res.cookie("social_cookie", secretRefreshToken, {
    httpOnly: true,
    maxAge: 4 * 24 * 60 * 60 * 1000,
  });

  if (!refreshToken) throw Error("bad token");

  return refreshToken.status(200).json({ user: userObj, secretToken });
};

export const refreshToken: ExpressHandlers<
  RefreshTokenReq,
  RefreshTokenRes
> = async (req, res) => {
  const refreshToken = req.cookies.social_cookie;
  if (!refreshToken) return res.sendStatus(400);

  const { id } = req.body;
  if (!id) return res.json({ error: "user not found" });
  const getUser = await veryficationUserId(id);

  const secretToken = RefreshToken({ id: getUser });

  const tokenAccess = process.env.TOKEN_REFRESH as string;

  const tokenScan = jwt.verify(secretToken, tokenAccess) as { id: string };

  if (!secretToken || !tokenScan) return res.sendStatus(400);

  const decoded = tokenScan.id;

  if (decoded !== getUser) return res.sendStatus(400);

  return res.status(200).json({ tokenAccess: secretToken });
};

export const logout: ExpressHandlers<LogoutReq, LogoutRes> = async (
  req,
  res
) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (accessToken) {
    blacklistedAccessTokens.add(accessToken);
  } else {
    throw Error("bad request");
  }
  return res
    .clearCookie("social_cookie")
    .status(200)
    .json({ message: "logout seccessfully" });
};
