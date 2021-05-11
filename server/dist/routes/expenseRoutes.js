"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseControllers_1 = require("../controllers/expenseControllers");
const authMiddleWare_1 = require("../middlewares/authMiddleWare");
const router = express_1.default.Router();
router.route("/current/preview").get(authMiddleWare_1.protect, expenseControllers_1.currentMonthPreview);
router.route("/by/category").get(authMiddleWare_1.protect, expenseControllers_1.getExpenseByCategory);
router.route("/category/averages").get(authMiddleWare_1.protect, expenseControllers_1.averageCategories);
router.route("/yearly").get(authMiddleWare_1.protect, expenseControllers_1.yearlyExpenses);
router.route("/plot").get(authMiddleWare_1.protect, expenseControllers_1.plotExpenses);
router.route("/by/user").get(authMiddleWare_1.protect, expenseControllers_1.listExpenseByUser);
router.route("/").post(authMiddleWare_1.protect, expenseControllers_1.createExpense);
router
    .route("/:id")
    .get(authMiddleWare_1.protect, expenseControllers_1.getExpenseById)
    .delete(authMiddleWare_1.protect, expenseControllers_1.deleteExpense);
exports.default = router;
