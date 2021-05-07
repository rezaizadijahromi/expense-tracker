import { Document } from "mongoose";
interface UserInt extends Document {
  name: String;
  email: String;
  password: String;
  isAdmin: String;
}

export default UserInt;
