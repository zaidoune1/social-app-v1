import { RequestHandler } from "express";

export type ExpressHandlers<Req, Res> = RequestHandler<
  string,
  Partial<Res>,
  Partial<Req>,
  any
>;
