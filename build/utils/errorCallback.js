"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    console.log('work here');
    const statusCode = err.code || 500;
    const message = err.message || 'UNKNOWN_ERROR';
    res.status(statusCode).json({
        error: {
            message,
            statusCode
        }
    });
};
