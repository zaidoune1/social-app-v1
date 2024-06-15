import express from "express";
import asyncHandler from "express-async-handler";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePosts,
} from "../handlers/postHandlers";

export const routePosts = express.Router();

routePosts.route("/post").post(asyncHandler(createPost));
routePosts.route("/post").delete(asyncHandler(deletePost));
routePosts.route("/posts").get(asyncHandler(getAllPosts));
routePosts.route("/post").put(asyncHandler(updatePosts));
