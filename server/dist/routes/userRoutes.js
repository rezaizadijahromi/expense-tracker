"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userControllers_1 = require("../controllers/userControllers");
const express_1 = __importDefault(require("express"));
const authMiddleWare_1 = require("../middlewares/authMiddleWare");
const router = express_1.default.Router();
router.route("/").post(userControllers_1.registerUser);
router.route("/login").post(userControllers_1.loginUser);
router
    .route("/profile")
    .get(authMiddleWare_1.protect, userControllers_1.userProfile)
    .put(authMiddleWare_1.protect, userControllers_1.updateUserProfile)
    .delete(authMiddleWare_1.protect, userControllers_1.deleteUserProfile);
exports.default = router;
