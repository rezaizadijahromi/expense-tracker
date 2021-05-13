import { Document } from "mongoose";

interface ExpenseInt extends Document {
  title: String;
  category: String[];
  amount: Number;
  incurred_on: Date;
  notes: String;
  updated: Date;
  created: Date;
  recoreded_by: String;
}

export default ExpenseInt;
