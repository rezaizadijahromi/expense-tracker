import express from "express";
import {
  averageCategories,
  currentMonthPreview,
  getExpenseByCategory,
  plotExpenses,
  yearlyExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
} from "../controllers/expenseControllers";
import { protect, admin } from "../middlewares/authMiddleWare";

const router = express.Router();

router.route("current/preview").get(protect, currentMonthPreview);
router.route("/by/category").get(protect, getExpenseByCategory);
router.route("/plot").get(protect, plotExpenses);
router.route("/category/averages").get(protect, averageCategories);
router.route("/yearly").get(protect, yearlyExpenses);

router.route("/").post(protect, createExpense);
router
  .route("/:id")
  .get(protect, getExpenseById)
  .delete(protect, deleteExpense);

export default router;
