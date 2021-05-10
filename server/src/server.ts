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

app.use(cors());

// Rotes
app.use("/api/users", userRoutes);
app.use("/api/expense", expenseRoutes);

// Error middlewares
app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
