import express from "express";
import asyncHandler from "express-async-handler";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../handlers/userHandlers";
import { tokenVerify } from "../middlewares/authMiddleware";

export const routeUsers = express.Router();

routeUsers.route("/users").get(tokenVerify, asyncHandler(getUsers));
routeUsers.route("/user").get(tokenVerify, asyncHandler(getUser));
routeUsers.route("/user").delete(tokenVerify, asyncHandler(deleteUser));
routeUsers.route("/user").put(tokenVerify, asyncHandler(updateUser));
