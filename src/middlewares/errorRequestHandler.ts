import { ErrorRequestHandler } from "express";

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(400).send(`error handilng : ${err}`);
};
