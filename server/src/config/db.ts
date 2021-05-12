import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI!;

    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
