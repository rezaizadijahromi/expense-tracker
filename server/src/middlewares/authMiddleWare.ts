import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import UserInt from "../models/interfaces/userInterface";

export interface IGetUserAuthInfoRequest extends Request {
  user?: UserInt | null; // or any other type
}

interface jwtPayload {
  id: string;
  username: string;
  email: string;
}

const protect = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        let decoded: jwtPayload = jwt.verify(token, "reza") as jwtPayload;

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  },
);

const admin = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as admin");
    }
  },
);

export { protect, admin };
