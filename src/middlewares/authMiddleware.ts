import jwt, { JwtPayload } from "jsonwebtoken";
import { ExpressHandlers } from "../utils/ExpressHandlers";
import { TokenReq, TokenRes } from "../utils/handlerTokenTypes";
import { db } from "../utils/dbCall";

export const tokenVerify: ExpressHandlers<TokenReq, TokenRes> = async (
  req,
  res,
  next
) => {
  const refreshToken = req.cookies.social_cookie;

  if (!refreshToken)
    return res.status(400).json({ message: "please login ! " });
  const authorization = req.headers?.authorization;

  if (!authorization || !authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "not authorization" });

  const getToken = authorization.split(" ")[1];

  if (!getToken) throw Error("not authorization");

  const tokenAccess = process.env.TOKEN_ACCESS;
  if (!tokenAccess) {
    throw new Error("token not found");
  }

  try {
    const decoded = jwt.verify(getToken, tokenAccess) as { id: string };

    const findUser = await db.getOneUser(decoded.id);
    if (!findUser) {
      return res.status(401).json({ error: "bad token" });
    }
    if (findUser.id !== decoded.id)
      return res.status(400).json({ error: "not authorization" });
    res.locals.userId = findUser.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "not authorization" });
  }
};
