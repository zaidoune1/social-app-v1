import express, { RequestHandler } from "express";
import { getAllUsers, userAdd } from "./src/handlers/postHandlers";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/user", userAdd);

app.get("/users", getAllUsers);

app.listen(PORT, () => {
  console.log("server runnig in port" + " " + PORT);
});
