import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const uri = process.env.JWT_SECRET!;

    const conn = await mongoose.connect(
      "mongodb+srv://rezaizadi:aloneking@cluster0.ijklq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
