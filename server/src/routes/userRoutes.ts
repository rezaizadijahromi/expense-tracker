import { loginUser, registerUser } from "../controllers/userControllers";
import express from "express";

const router = express.Router();

router.route("/").post(registerUser);

export default router;
