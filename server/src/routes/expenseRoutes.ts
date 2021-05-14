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
  listExpenseByUser,
  getAllCategory,
  createCategory,
} from "../controllers/expenseControllers";
import { protect, admin } from "../middlewares/authMiddleWare";

const router = express.Router();
router.route("/category").post(createCategory).get(getAllCategory);

router.route("/current/preview").get(protect, currentMonthPreview);
router.route("/by/category").get(protect, getExpenseByCategory);
router
  .route("/category/averages")
  .get(protect, averageCategories)
  .post(protect, averageCategories);
router.route("/yearly").get(protect, yearlyExpenses);
router.route("/plot").get(protect, plotExpenses);
router.route("/by/user").get(protect, listExpenseByUser);

router.route("/").post(protect, createExpense);
router
  .route("/:id")
  .get(protect, getExpenseById)
  .delete(protect, deleteExpense);

export default router;
