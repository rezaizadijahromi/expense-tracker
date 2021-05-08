import jwt from "jsonwebtoken";
import "dotenv/config";

import * as dotenv from "dotenv";
dotenv.config();

const generateToken = (id: string) => {
  return jwt.sign({ id }, "reza", {
    expiresIn: "30d",
  });
};

export default generateToken;
