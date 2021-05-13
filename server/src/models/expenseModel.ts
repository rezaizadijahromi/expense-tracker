import mongoose from "mongoose";
import ExpenseInt from "./interfaces/expenseInterface";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: "Category is required",
    unique: true,
  },
});

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: "Title is required",
  },
  category: [categorySchema],
  amount: {
    type: Number,
    min: 0,
    required: "Amount is required",
  },
  incurred_on: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  recorded_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Expense = mongoose.model<ExpenseInt>("Expense", expenseSchema);
export default Expense;
