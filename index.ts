import express, { ErrorRequestHandler } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./src/handlers/userHandlers";
import { initDb } from "./src/utils/dbCall";
import { login, logout, refreshToken, userAdd } from "./src/handlers/userAuth";
import dotenv from "dotenv";
import { tokenVerify } from "./src/middlewares/authMiddleware";
import asyncHandler from "express-async-handler";
import { errorHandling } from "./src/middlewares/errorRequestHandler";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePosts,
} from "./src/handlers/postHandlers";
import { routeAuth } from "./src/routes/authRoutes";
import { routeUsers } from "./src/routes/userRoute";
import { routePosts } from "./src/routes/postsRoutes";

const app = express();

(async () => {
  await initDb();
  app.use(cookieParser());
  dotenv.config();
  app.use(bodyParser.json());
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  app.get("/healthz", (req, res) => res.send({ status: "✌️" }));

  app.use("/", routeAuth);
  app.use("/", routeUsers);
  app.use("/", routePosts);

  // app.get("/healthz", (req, res) => res.send({ status: "✌️" }));
  // app.post("/login", asyncHandler(login));
  // app.post("/signup", asyncHandler(userAdd));
  // app.get("/refreshToken", asyncHandler(refreshToken));
  // app.use(tokenVerify);
  // app.post("/post", asyncHandler(createPost));
  // app.get("/users", asyncHandler(getUsers));
  // app.get("/user", asyncHandler(getUser));
  // app.delete("/user", asyncHandler(deleteUser));
  // app.put("/user", asyncHandler(updateUser));
  // app.delete("/post", asyncHandler(deletePost));
  // app.get("/posts", asyncHandler(getAllPosts));
  // app.put("/post", asyncHandler(updatePosts));
  // app.get("/logout", asyncHandler(logout));

  app.use(errorHandling);

  app.listen(PORT, () => {
    console.log("server runnig in port" + " " + PORT);
  });
})();
