import jwt, { JwtPayload } from "jsonwebtoken";

export const accessToken = (userObj: JwtPayload): string => {
  return jwt.sign(userObj, tokenExist(), {
    expiresIn: "1d",
  });
};

const tokenExist = (): string => {
  const tokenAccess = process.env.TOKEN_ACCESS;

  if (!tokenAccess) {
    console.error("Missing JWT secret");
    process.exit(1);
  }

  return tokenAccess;
};

export const RefreshToken = (userObj: JwtPayload): string => {
  return jwt.sign(userObj, refreshtokenExist(), {
    expiresIn: "3d",
  });
};

const refreshtokenExist = (): string => {
  const tokenAccess = process.env.TOKEN_REFRESH;

  if (!tokenAccess) {
    console.error("Missing JWT secret");
    process.exit(1);
  }

  return tokenAccess;
};
