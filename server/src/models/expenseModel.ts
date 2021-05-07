import mongoose from "mongoose";
import Expense from "./interfaces/expenseInterface";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: "Title is required",
  },
  category: {
    type: String,
    trim: true,
    required: "Category is required",
  },
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
  recoreded_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Expense = mongoose.model<Expense & mongoose.Document>(
  "Expense",
  expenseSchema,
);
export default Expense;
