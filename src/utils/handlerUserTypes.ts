import { user } from "../../types/user";

// add user
export type createUserRes = {};
export type createUserReq = Pick<
  user,
  "id" | "email" | "userName" | "password" | "lastName"
>;

// get all users
export type getAllUsersRes = {
  users: user[];
};
export type getAllUsersReq = {};

// get users
export type getUserReq = {};

export type getUserRes = {
  user: user | void;
  message: string;
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
