import { Document } from "mongoose";
interface UserInt extends Document {
  _id: String;
  name: String;
  email: String;
  password: String;
  isAdmin: String;
}

export default UserInt;
