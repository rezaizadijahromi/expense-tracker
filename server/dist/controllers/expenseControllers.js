"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getAllCategory = exports.plotExpenses = exports.yearlyExpenses = exports.averageCategories = exports.getExpenseByCategory = exports.currentMonthPreview = exports.listExpenseByUser = exports.deleteExpense = exports.getExpenseById = exports.createExpense = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const getAllCategory = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllCategories = yield CategoryModel_1.default.find({});
    if (getAllCategories) {
        res.json(getAllCategories);
    }
    else {
        res.json("No category");
    }
}));
exports.getAllCategory = getAllCategory;
const createCategory = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body.category;
    const existCategory = yield CategoryModel_1.default.find({ category: category });
    if (existCategory.length > 0) {
        res.json("Already Exist");
    }
    else {
        const newCategory = new CategoryModel_1.default({
            category,
        });
        yield newCategory.save();
        res.json(newCategory);
    }
}));
exports.createCategory = createCategory;
// @desc Create a expense
// @route /api/expense
// @access private
const createExpense = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        const { title, category, amount, notes, incurred_on } = req.body;
        const newExpense = new expenseModel_1.default({
            title,
            amount,
            notes,
            recorded_by: user,
            incurred_on,
        });
        const existCategory = yield CategoryModel_1.default.find({ category: category });
        if (existCategory.length > 0) {
            console.log(existCategory[0]._id);
            const newCategoryExist = {
                _id: existCategory[0]._id,
                category: category,
            };
            newExpense.category.push(newCategoryExist);
        }
        else {
            const newCategory = new CategoryModel_1.default({
                category,
            });
            yield newCategory.save();
            newExpense.category.push(newCategory);
        }
        if (newExpense) {
            yield newExpense.save();
            res.status(201).json(newExpense);
        }
        else {
            res.status(400);
            throw new Error("Creating Expense failed");
        }
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
exports.createExpense = createExpense;
// @desc Get a expense by id
// @route /api/expense/:id
// @access Private
const getExpenseById = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let expense = yield expenseModel_1.default.findById(req.params.id)
        .populate("recorded_by", "_id name")
        .exec();
    if (!expense) {
        res.status(400);
        throw new Error("Expense not found");
    }
    else {
        res.json(expense);
    }
}));
exports.getExpenseById = getExpenseById;
// @desc Delete a expense by id
// @route /api/expense/:id
// @access Private
const deleteExpense = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = yield expenseModel_1.default.findById(req.params.id);
    if (expense) {
        yield expense.remove();
        res.json("Expense deleted");
    }
    else {
        res.status(404);
        throw new Error("not found");
    }
}));
exports.deleteExpense = deleteExpense;
// @desc Get a list of expense by user
// @route /api/expense/
// @access Private
const listExpenseByUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield userModel_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 1);
    try {
        let expenses = yield expenseModel_1.default.find({
            $and: [
                { incurred_on: { $gte: firstDay, $lte: lastDay } },
                { recorded_by: user === null || user === void 0 ? void 0 : user._id },
            ],
        })
            .sort("incurred_on")
            .populate("recorded_by", "_id name");
        res.json(expenses);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
exports.listExpenseByUser = listExpenseByUser;
// @desc Get a list of expense by month
// @route /api/expense/preview
// @access Private
const currentMonthPreview = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    const user = userModel_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    if (user) {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
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
        let currentPreview = yield expenseModel_1.default.aggregate([
            {
                $facet: {
                    month: [
                        {
                            $match: {
                                incurred_on: { $gte: firstDay, $lt: lastDay },
                                recorded_by: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
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
                                recorded_by: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id,
                            },
                        },
                        { $group: { _id: "today", totalSpent: { $sum: "$amount" } } },
                    ],
                    yesterday: [
                        {
                            $match: {
                                incurred_on: { $gte: yesterday, $lt: today },
                                recorded_by: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id,
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
    }
    else {
        res.status(404);
        throw new Error("User not found authenticate first");
    }
}));
exports.currentMonthPreview = currentMonthPreview;
// @desc Get a list of expense by category
// @route /api/expense/by/category
// @access Private
const getExpenseByCategory = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const user = yield userModel_1.default.findById((_g = req.user) === null || _g === void 0 ? void 0 : _g._id);
    if (user) {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        try {
            let categoryMonthlyAvg = yield expenseModel_1.default.aggregate([
                {
                    $facet: {
                        average: [
                            {
                                $match: {
                                    recorded_by: user._id,
                                },
                            },
                            {
                                $group: {
                                    _id: {
                                        category: "$category.category",
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
                                    recorded_by: user._id,
                                },
                            },
                            {
                                $group: {
                                    _id: "$category.category",
                                    totalSpent: { $sum: "$amount" },
                                },
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
        }
        catch (err) {
            res.status(400);
            throw new Error(err);
        }
    }
    else {
        throw new Error("User not found authenticate first");
    }
}));
exports.getExpenseByCategory = getExpenseByCategory;
// @desc Get a average of yearly expenses
// @route /api/expense/average/expenses
// @access Private
const averageCategories = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const user = yield userModel_1.default.findById((_h = req.user) === null || _h === void 0 ? void 0 : _h._id);
    console.log("here");
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);
    console.log(firstDay);
    console.log(lastDay);
    console.log("first");
    if (user) {
        // these are original code
        if (req.method == "POST") {
            firstDay = new Date(req.body.firstDay);
            lastDay = new Date(req.body.lastDay);
        }
        // for testing
        // const firstDay = new Date(y, m, 1);
        // const lastDay = new Date(y, m + 1, 0);
        try {
            let categoryMonthlyAvg = yield expenseModel_1.default.aggregate([
                {
                    $match: {
                        incurred_on: { $gte: firstDay, $lte: lastDay },
                        recorded_by: user._id,
                    },
                },
                {
                    $group: {
                        _id: { category: "$category" },
                        totalSpent: { $sum: "$amount" },
                    },
                },
                {
                    $group: {
                        _id: "$_id.category",
                        avgSpent: { $avg: "$totalSpent" },
                    },
                },
                { $project: { x: "$_id.category", y: "$avgSpent" } },
            ]).exec();
            res.json({ monthAVG: categoryMonthlyAvg });
        }
        catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    else {
        res.status(404);
        throw new Error("User not found authenticate first and then come back");
    }
}));
exports.averageCategories = averageCategories;
// @desc Get all the expense in year
// @route /api/expense/average/expenses
// @access Private
const yearlyExpenses = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const user = yield userModel_1.default.findById((_j = req.user) === null || _j === void 0 ? void 0 : _j._id);
    if (user) {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const firstDay = new Date(y, 0, 1);
        const lastDay = new Date(y, 12, 0);
        try {
            let totalMonthly = yield expenseModel_1.default.aggregate([
                {
                    $match: {
                        incurred_on: { $gte: firstDay, $lt: lastDay },
                        recorded_by: user._id,
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
            res.json(totalMonthly);
        }
        catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    else {
        res.status(404);
        throw new Error("User not found athenticate first and the come back");
    }
}));
exports.yearlyExpenses = yearlyExpenses;
const plotExpenses = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const user = yield userModel_1.default.findById((_k = req.user) === null || _k === void 0 ? void 0 : _k._id);
    if (user) {
        try {
            // const date = new Date(req.query.month as any),
            //   y = date.getFullYear(),
            //   m = date.getMonth();
            // testing
            const date = new Date(), y = date.getFullYear(), m = date.getMonth();
            const firstDay = new Date(y, m, 1);
            const lastDay = new Date(y, m + 1, 0);
            let totalMonthly = yield expenseModel_1.default.aggregate([
                {
                    $match: {
                        incurred_on: { $gte: firstDay, $lt: lastDay },
                        recorded_by: user._id,
                    },
                },
                { $project: { x: { $dayOfMonth: "$incurred_on" }, y: "$amount" } },
            ]).exec();
            res.json(totalMonthly);
        }
        catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
    else {
        res.status(404);
        throw new Error("User not found authenticate first and then comeback");
    }
}));
exports.plotExpenses = plotExpenses;
