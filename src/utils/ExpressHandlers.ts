import { RequestHandler } from "express";

export type responseError<T> = T & { error?: string };

export type ExpressHandlers<Req, Res> = RequestHandler<
  string,
  Partial<responseError<Res>>,
  Partial<Req>,
  any
>;
