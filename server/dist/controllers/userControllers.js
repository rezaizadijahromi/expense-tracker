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
exports.deleteUserProfile = exports.updateUserProfile = exports.userProfile = exports.registerUser = exports.loginUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const alreadyExists = yield userModel_1.default.findOne({ email });
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    if (alreadyExists) {
        res.status(400);
        throw new Error("Already register with this email");
    }
    const user = new userModel_1.default({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        const newUser = yield user.save();
        res.status(201).json({
            name,
            email,
            password,
            token: generateToken_1.default(newUser._id.toString()),
            created: newUser === null || newUser === void 0 ? void 0 : newUser.created,
        });
    }
    else {
        res.status(400);
        throw new Error("Bad data");
    }
}));
exports.registerUser = registerUser;
// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield userModel_1.default.findOne({ email });
    const passwordUser = user === null || user === void 0 ? void 0 : user.password.toString();
    if (user && (yield bcrypt_1.default.compare(password, passwordUser))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken_1.default(user._id.toString()),
            created: user === null || user === void 0 ? void 0 : user.created,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}));
exports.loginUser = loginUser;
// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const userProfile = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
exports.userProfile = userProfile;
// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name, email, password } = req.body;
    const user = yield userModel_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        yield user.save();
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
    const userUpdated = yield (user === null || user === void 0 ? void 0 : user.save());
    res.json(userUpdated);
}));
exports.updateUserProfile = updateUserProfile;
// @desc Delete user profile
// @route Delete /api/users/profile
// @access Private
const deleteUserProfile = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = userModel_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    if (user) {
        yield user.remove();
        res.json("User deleted");
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
    res.json("User deleted");
}));
exports.deleteUserProfile = deleteUserProfile;
// @desc Get all the users
// @route GET /api/users/list
// @access Private Admin
const getUsersList = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = userModel_1.default.find({});
    if (users) {
        res.json(users);
    }
    else {
        res.status(404);
        throw new Error("No users in list");
    }
}));
