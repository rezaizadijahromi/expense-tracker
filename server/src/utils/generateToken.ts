import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const generateToken = (id: string) => {
  console.log(process.env.JWT_SECRET!);

  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export default generateToken;
