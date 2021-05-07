import { loginUser, registerUser } from "../controllers/userControllers";
import express from "express";
import { protect, admin } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").post(protect, registerUser);
router.route("/profile").post(protect, loginUser);

export default router;
