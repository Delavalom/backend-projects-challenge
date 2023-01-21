import { NextFunction, Request, Response } from "express";

export function ResponseTimeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Request....");
  next();
}
