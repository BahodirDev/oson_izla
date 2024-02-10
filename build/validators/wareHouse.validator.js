"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wareHousePostValidator = exports.wareHousePatchValidator = void 0;
const express_validator_1 = require("express-validator");
const wareHousePostValidator = [
    (0, express_validator_1.body)("name", "Name field is required")
        .notEmpty()
        .withMessage("Name is required!")
        .trim()
        .withMessage("Empty sapce is not allowed")
        .isLength({
        max: 250,
        min: 5
    })
        .withMessage("Name characters must be at least 5 and less than 250 symbols")
        .isString()
        .withMessage("Name characters must be string")
];
exports.wareHousePostValidator = wareHousePostValidator;
const wareHousePatchValidator = [
    (0, express_validator_1.param)('id')
        .isUUID(4)
        .withMessage("Param must be sent in UUID4 version"),
    (0, express_validator_1.body)('name')
        .optional()
        .custom((value, {}) => {
        // Check if the 'name' field is provided (not empty)
        if (value) {
            if (typeof value === 'string') {
                // Perform length validation only when 'name' is provided and is a string
                return value.length >= 5 && value.length <= 250;
            }
            return false; // If 'name' is provided but not a string
        }
        return true; // If 'name' is not provided (optional)
    })
        .withMessage("Name must be between 5 and 250 characters")
];
exports.wareHousePatchValidator = wareHousePatchValidator;
