"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleWare_1 = require("./middlewares/errorMiddleWare");
dotenv.config();
// Db connection
db_1.default();
const app = express_1.default();
app.use(express_1.default.json());
let corsOption = {
    origin: [
        "https://expense-tracker-rij.herokuapp.com",
        "http://localhost:3000",
        "http://localhost:5000",
        "http://localhost:5001",
    ],
};
app.use(cors_1.default(corsOption));
// console.log("above", path.join(path.resolve(), "../frontend/build"));
// Rotes
app.use("/api/users", userRoutes_1.default);
app.use("/api/expense", expenseRoutes_1.default);
// const __dirname = path.resolve();
app.use("/uploads", express_1.default.static(path_1.default.join(path_1.default.resolve(), "/uploads")));
const dev = "production";
if (dev === "production") {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "frontend/build")));
    console.log(path_1.default.join(path_1.default.resolve(), "frontend/build"));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(path_1.default.resolve(), "frontend", "build", "index.html")));
}
else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}
// Error middlewares
app.use(errorMiddleWare_1.notFound);
// app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
