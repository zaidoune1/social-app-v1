import { posts } from "../../types/posts";
import { user } from "../../types/user";

// add user
export type createUserRes = {
  message?: string;
  tokenAccess: string;
};
export type createUserReq = Partial<user>;

// get all users
export type getAllUsersRes = {
  users: user[] | undefined;
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
  user: user;
};

// update
export type updateUserReq = Pick<
  user,
  "email" | "lastName" | "userName" | "password"
>;

export type updateUserRes = {
  user: user | void;
  message?: string;
};

// Auth

export type AuthReq = {
  email: string;
  password: string;
};

export type AuthRes = {
  user: Omit<user, "id" | "password">;
  secretToken: string;
  message?: string;
};

export type userObj = Omit<user, "id" | "password">;

// token verify

export type TokenReq = {};

export type TokenRes = {};

// create posts

export type createPostReq = {
  post: string;
  url: string;
};

export type createPostRes = {
  post: posts;
  message?: string;
};
