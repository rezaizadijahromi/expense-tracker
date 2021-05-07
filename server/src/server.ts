import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
// Db connection

const app: Application = express();
app.use(express.json());

app.use(cors());

// Rotes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
