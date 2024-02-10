"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revertedErrorBack = void 0;
const express_validator_1 = require("express-validator");
function revertedErrorBack(req) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return { error: error.array() };
    }
}
exports.revertedErrorBack = revertedErrorBack;
