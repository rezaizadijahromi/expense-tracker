import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: ErrorRequestHandler,
) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message
    stack: process.env.NODE_ENV == "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
