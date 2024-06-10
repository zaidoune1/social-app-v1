import bcrypt from "bcrypt";

export const bcryptPasswordHash = async (passwordReq: string) => {
  const passwordSalt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(passwordReq, passwordSalt);

  return passwordHash;
};

export const comparePassword = async (
  passwordReq: string,
  userPassword: string
) => {
  const isMatcherPassword = await bcrypt.compare(passwordReq, userPassword);

  return isMatcherPassword;
};
