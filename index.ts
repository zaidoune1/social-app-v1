import express, { ErrorRequestHandler } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./src/handlers/userHandlers";
import { initDb } from "./src/utils/dbCall";
import { login, userAdd } from "./src/handlers/userAuth";
import dotenv from "dotenv";
import { tokenVerify } from "./src/middlewares/authMiddleware";
import asyncHandler from "express-async-handler";
import { errorHandling } from "./src/middlewares/errorRequestHandler";

const app = express();

(async () => {
  await initDb();

  dotenv.config();
  const PORT = process.env.PORT || 3000;
  app.use(express.json());
  app.post("/login", asyncHandler(login));
  app.get("/users", tokenVerify, asyncHandler(getUsers));
  app.post("/user", asyncHandler(userAdd));
  app.get("/user", asyncHandler(getUser));
  app.delete("/user", asyncHandler(deleteUser));
  app.put("/user", asyncHandler(updateUser));

  app.use(errorHandling);

  app.listen(PORT, () => {
    console.log("server runnig in port" + " " + PORT);
  });
})();
