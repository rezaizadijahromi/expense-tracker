"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required",
    },
    password: {
        type: String,
        required: "Password is required",
    },
    isAdmin: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
