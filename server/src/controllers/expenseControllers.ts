import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

import ExpenseInt from "../models/interfaces/expenseInterface";
import Expense from "../models/expenseModel";
import UserInt from "../models/interfaces/userInterface";
import { error } from "node:console";

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

// @desc Delete a expense by id
// @route /api/expense/:id
// @access Private

const deleteExpense = asyncHandler(
  async (req: ExpenseExpress, res: Response) => {
    const expense = await Expense.findById(req.expense?._id);
    if (expense) {
      await expense.remove();
      res.json("Expense deleted");
    } else {
      res.status(404);
      throw new Error("not found");
    }
  },
);

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

// @desc Get a list of expense by month
// @route /api/expense/preview
// @access Private

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

        let expensePreview = {
          month: currentPreview[0].month[0],
          today: currentPreview[0].today[0],
          yesterday: currentPreview[0].yesterday[0],
        };
        res.json(expensePreview);
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

// @desc Get a list of expense by category
// @route /api/expense/category
// @access Private

const getExpenseByCategory = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await User.findById(req.user?._id);
    if (user) {
      const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();

      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);

      try {
        let categoryMonthlyAvg = await Expense.aggregate([
          {
            $facet: {
              average: [
                {
                  $match: {
                    recorded_by: user,
                  },
                },
                {
                  $group: {
                    _id: {
                      category: "$category",
                      month: { $month: "$incurred_on" },
                    },
                    totalSpent: { $sum: "$amount" },
                  },
                },
                {
                  $group: {
                    _id: "$_id.category",
                    avgSpent: { $avg: "$totalSpent" },
                  },
                },
                {
                  $project: {
                    _id: "$_id",
                    value: { average: "$avgSpent" },
                  },
                },
              ],
              total: [
                {
                  $match: {
                    incurred_on: { $gte: firstDay, $lte: lastDay },
                    recorded_by: user,
                  },
                },
                {
                  $group: { _id: "$category", totalSpent: { $sum: "$amount" } },
                },
                {
                  $project: {
                    _id: "$_id",
                    value: { total: "$totalSpent" },
                  },
                },
              ],
            },
          },
          {
            $project: {
              overview: { $setUnion: ["$average", "$total"] },
            },
          },
          { $unwind: "$overview" },
          { $replaceRoot: { newRoot: "$overview" } },
          {
            $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" } },
          },
        ]).exec();
        res.json(categoryMonthlyAvg);
      } catch (err) {
        console.log(err);
        res.status(400);
        throw new Error(err);
      }
    } else {
      throw new Error("User not found authenticate first");
    }
  },
);

// @desc Get a average of yearly expenses
// @route /api/expense/average/expenses
// @access Private

const averageCategories = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {
      const firstDay = new Date(req.query.firstDay as any);
      const lastDay = new Date(req.query.lastDay as any);

      try {
        let categoryMonthlyAvg = await Expense.aggregate([
          {
            $match: {
              incurred_on: { $gte: firstDay, $lte: lastDay },
              recorded_by: user,
            },
          },
          {
            $group: {
              _id: { category: "$category" },
              totalSpent: { $sum: "$amount" },
            },
          },
          {
            $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent" } },
          },
          { $project: { x: "$_id", y: "$avgSpent" } },
        ]).exec();
        res.json({ monthAVG: categoryMonthlyAvg });
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
    } else {
      res.status(404);
      throw new Error("User not found authenticate first and then come back");
    }
  },
);

// @desc Get all the expense in year
// @route /api/expense/average/expenses
// @access Private

const yearlyExpenses = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = User.findById(req.user?._id);

    if (user) {
      const y = req.query.year as any;
      const firstDay = new Date(y, 0, 1);
      const lastDay = new Date(y, 12, 0);

      try {
        let totalMonthly = await Expense.aggregate([
          {
            $match: {
              incurred_on: { $gte: firstDay, $lt: lastDay },
              recorded_by: user,
            },
          },
          {
            $group: {
              _id: { $month: "$incurred_on" },
              totalSpent: { $sum: "$amount" },
            },
          },
          { $project: { x: "$_id", y: "$totalSpent" } },
        ]).exec();
        res.json({ monthTot: totalMonthly });
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
    } else {
      res.status(404);
      throw new Error("User not found athenticate first and the come back");
    }
  },
);

const plotExpenses = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {
      try {
        const date = new Date(req.query.month as any),
          y = date.getFullYear(),
          m = date.getMonth();

        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);

        let totalMonthly = await Expense.aggregate([
          {
            $match: {
              incurred_on: { $gte: firstDay, $lt: lastDay },
              recorded_by: user,
            },
          },
          { $project: { x: { $dayOfMonth: "$incurred_on" }, y: "$amount" } },
        ]).exec();
        res.json(totalMonthly);
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
    } else {
      res.status(404);
      throw new Error("User not found authenticate first and then comeback");
    }
  },
);

export {
  createExpense,
  getExpenseById,
  deleteExpense,
  listExpenseByUser,
  currentMonthPreview,
  getExpenseByCategory,
  averageCategories,
  yearlyExpenses,
  plotExpenses,
};
