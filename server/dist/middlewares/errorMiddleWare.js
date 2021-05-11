"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (req, res, next, err) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(400);
    res.status(statusCode);
    res === null || res === void 0 ? void 0 : res.json({
        message: err === null || err === void 0 ? void 0 : err.message,
        stack: process.env.NODE_ENV == "production" ? null : err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.errorHandler = errorHandler;
