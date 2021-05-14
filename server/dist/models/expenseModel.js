"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        trim: true,
        required: "Category is required",
        unique: true,
    },
});
const expenseSchema = new mongoose_1.default.Schema({
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
    recorded_by: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
const Expense = mongoose_1.default.model("Expense", expenseSchema);
exports.default = Expense;
