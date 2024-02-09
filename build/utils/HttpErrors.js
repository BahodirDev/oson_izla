"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.InternalServerError = exports.BadUserInput = void 0;
const statusCodeEnum_1 = __importDefault(require("../enums/statusCodeEnum"));
class BadUserInput extends Error {
    constructor(message, stack = "logger") {
        super(message);
        this.name = "BadUserInput";
        this.code = statusCodeEnum_1.default.badRequest;
        this.stack = stack;
    }
}
exports.BadUserInput = BadUserInput;
class InternalServerError extends Error {
    constructor(message, stack = "logger") {
        super(message);
        this.name = "InternalServerError";
        this.code = statusCodeEnum_1.default.serverError;
        this.stack = stack;
    }
}
exports.InternalServerError = InternalServerError;
class NotFoundError extends Error {
    constructor(message, stack = "logger") {
        super(message);
        this.name = "NotFoundError";
        this.code = statusCodeEnum_1.default.notFound;
        this.stack = stack;
    }
}
exports.NotFoundError = NotFoundError;
