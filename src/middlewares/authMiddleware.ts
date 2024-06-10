import jwt from "jsonwebtoken";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { TokenReq, TokenRes } from "../utils/handlerUserTypes";
import { db } from "../utils/dbCall";

export const tokenVerify: ExpressHandlers<TokenReq, TokenRes> = async (
  req,
  res,
  next
) => {
  const authorization = req.headers?.authorization;

  if (!authorization || !authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "not authorization" });

  const getToken = authorization.split(" ")[1];

  if (!getToken) throw Error("not authorization");

  const tokenAccess = process.env.TOKEN_ACCESS;
  if (!tokenAccess) {
    throw new Error("token not found");
  }

  jwt.verify(getToken, tokenAccess, async (err, decoded: any) => {
    if (err) throw new Error("TOKEN_ACCESS is not defined");
    const findUser = await db.getOneUser(decoded.id);
    if (!findUser) throw new Error("bad token");
  });

  next();
};
