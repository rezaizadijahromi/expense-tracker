import path from "path";
import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

import { notFound, errorHandler } from "./middlewares/errorMiddleWare";

dotenv.config();
// Db connection
connectDB();

const app: Application = express();
app.use(express.json());

let corsOption = {
  origin: [
    "https://expense-tracker-rij.herokuapp.com",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5001",
  ],
};

app.use(cors(corsOption));
// console.log("above", path.join(path.resolve(), "../frontend/build"));

// Rotes
app.use("/api/users", userRoutes);
app.use("/api/expense", expenseRoutes);

// const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));
const dev = "production";
if (dev === "production") {
  app.use(express.static(path.join(path.resolve(), "frontend/build")));
  console.log(path.join(path.resolve(), "frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), "frontend", "build", "index.html"),
    ),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error middlewares
app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
