import { user } from "../../types/user";

// add user
export type createUserRes = {};
export type createUserReq = Pick<user, "email" | "name" | "password">;

// get all users
export type getAllUsersRes = {
  users: user[];
};
export type getAllUsersReq = {};

// get users
export type getUserReq = {};

export type getUserRes = {
  user: user;
};

// user delete
export type deleteUserReq = {};

export type deleteUserRes = {
  message: string;
};

// update
export type updateUserReq = {};

export type updateUserRes = {
  user: user;
};
