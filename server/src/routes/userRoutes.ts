import {
  loginUser,
  registerUser,
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userControllers";
import express from "express";
import { protect, admin } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

export default router;
