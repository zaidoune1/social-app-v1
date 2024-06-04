import express, { ErrorRequestHandler } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  userAdd,
} from "./src/handlers/userHandlers";
import { initDb } from "./src/utils/dbCall";

const app = express();

(async () => {
  await initDb();

  const PORT = process.env.PORT || 3000;
  app.use(express.json());
  app.get("/users", getUsers);
  app.post("/user", userAdd);
  app.get("/user", getUser);
  app.delete("/user", deleteUser);
  app.put("/user", updateUser);

  const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
    return res.status(400).send(`error handilng : ${err}`);
  };
  app.use(errorHandling);

  app.listen(PORT, () => {
    console.log("server runnig in port" + " " + PORT);
  });
})();
