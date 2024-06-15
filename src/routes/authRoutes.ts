import express from "express";
import asyncHandler from "express-async-handler";
import { login, logout, refreshToken, userAdd } from "../handlers/userAuth";

export const routeAuth = express.Router();

routeAuth.route("/login").post(asyncHandler(login));
routeAuth.route("/signup").post(asyncHandler(userAdd));
routeAuth.route("/refreshToken").get(asyncHandler(refreshToken));
routeAuth.route("/logout").get(asyncHandler(logout));
