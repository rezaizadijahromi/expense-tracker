import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, "reza", {
    expiresIn: "30d",
  });
};

export default generateToken;
