import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

import UserInt from "../models/interfaces/userInterface";

export interface IGetUserAuthInfoRequest extends Request {
  user?: UserInt; // or any other type
}

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const password = req.body.password;
  const alreadyExists = await User.findOne({ email });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (alreadyExists) {
    res.status(400);
    throw new Error("Already register with this email");
  }

  const user = new User({
    name,
    email,
    hashedPassword,
  });

  if (user) {
    const newUser = await user.save();
    res.status(201).json({
      name,
      email,
      password,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    throw new Error("Bad data");
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const email = req.body.email;

    const password = req.body.password;
    const user = await User.findOne({ email });

    const passwordUser = user?.password.toString()!;
    if (user && (await bcrypt.compare(password, passwordUser))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  },
);

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const userProfile = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await User.findById(req.user);

    if (user) {
      res.json(user);
    }
  },
);

export { loginUser, registerUser };
