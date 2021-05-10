import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

import ExpenseInt from "../models/interfaces/expenseInterface";
import Expense from "../models/expenseModel";
import UserInt from "../models/interfaces/userInterface";

// Getting request props
export interface IGetUserAuthInfoRequest extends Request {
  user?: UserInt; // or any other type
}

export interface ExpenseExpress extends Request {
  expense?: ExpenseInt; // or any other type
}

// @desc Create a expense
// @route /api/expense
// @access private

const createExpense = asyncHandler(async (req: Request, res: Response) => {
  const { title, category, amount, notes, recoreded_by } = req.body;
  const newExpense = new Expense({
    title,
    category,
    amount,
    notes,
    recoreded_by,
  });
  if (newExpense) {
    await newExpense.save();
    res.status(201).json(newExpense);
  } else {
    res.status(400);
    throw new Error("Creating Expense failed");
  }
});

// @desc Get a expense by id
// @route /api/expense/:id
// @access Private

const getExpenseById = asyncHandler(async (req: Request, res: Response) => {
  try {
    let expense = await Expense.findById(req.params.id)
      .populate("recorded_by", "_id name")
      .exec();

    if (!expense) {
      res.status(400);
      throw new Error("Expense not found");
    }
    await expense.save();
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc Get a list of expense by user
// @route /api/expense/
// @access Private

const listExpenseByUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await User.findById(req.user?._id);

    let firstDay = req.query.firstDay;
    let lastDay = req.query.lastDay;

    try {
      let expenses = await Expense.find({
        $and: [
          { incurred_on: { $gte: firstDay, $lte: lastDay } },
          { recorded_by: user },
        ],
      })
        .sort("incurred_on")
        .populate("recorded_by", "_id name");

      res.json(expenses);
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  },
);

const currentMonthPreview = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = User.findById(req.user?._id);

    if (user) {
      const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();

      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);

      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const tomorrow = new Date();
      tomorrow.setUTCHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const yesterday = new Date();
      yesterday.setUTCHours(0, 0, 0, 0);
      yesterday.setDate(yesterday.getDate() - 1);

      try {
        let currentPreview = await Expense.aggregate([
          {
            $facet: {
              month: [
                {
                  $match: {
                    incurred_on: { $gte: firstDay, $lt: lastDay },
                    recorded_by: user,
                  },
                },
                {
                  $group: {
                    _id: "currentMonth",
                    totalSpent: { $sum: "$amount" },
                  },
                },
              ],
              today: [
                {
                  $match: {
                    incurred_on: { $gte: today, $lt: tomorrow },
                    recorded_by: user,
                  },
                },
                { $group: { _id: "today", totalSpent: { $sum: "$amount" } } },
              ],
              yesterday: [
                {
                  $match: {
                    incurred_on: { $gte: yesterday, $lt: today },
                    recorded_by: user,
                  },
                },
                {
                  $group: { _id: "yesterday", totalSpent: { $sum: "$amount" } },
                },
              ],
            },
          },
        ]);
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
    } else {
      res.status(404);
      throw new Error("User not found authenticate first");
    }
  },
);

export {
  createExpense,
  getExpenseById,
  listExpenseByUser,
  currentMonthPreview,
};
