import express, { ErrorRequestHandler } from "express";
import { getAllUsers, userAdd } from "./src/handlers/userHandlers";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get("/users", getAllUsers);
app.post("/user", userAdd);

const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(400).send(`error handilng : ${err}`);
};
app.use(errorHandling);

app.listen(PORT, () => {
  console.log("server runnig in port" + " " + PORT);
});
