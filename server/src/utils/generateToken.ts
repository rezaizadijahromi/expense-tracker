import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, "asdasdasdadfdgf", {
    expiresIn: "30d",
  });
};

export default generateToken;
