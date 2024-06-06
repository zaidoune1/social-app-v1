import express from "express";

const app = express();

const posts: any = [];

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server runnig in port" + " " + PORT);
});
