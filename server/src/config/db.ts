import mongoose from "mongoose";
import path from "path";
import * as dotenv from "dotenv";

const connectDB = async () => {
  try {
    const uri = process.env.JWT_SECRET!;

    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
