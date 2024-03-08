"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyPatchValidator = exports.companyPostValidator = void 0;
const express_validator_1 = require("express-validator");
const companyPostValidator = [
    (0, express_validator_1.body)("company_name", "Name field is required")
        .notEmpty()
        .withMessage("company_name is required!")
        .trim()
        .withMessage("Empty sapce is not allowed")
        .isLength({
        max: 250,
        min: 3,
    })
        .withMessage("Name characters must be at least 3 and less than 250 symbols")
        .isString()
        .withMessage("Name characters must be string"),
    (0, express_validator_1.body)("company_sub_name", "company_sub_name field is required")
        .optional()
        .trim()
        .isLength({
        max: 250,
        min: 3,
    })
        .withMessage("Name characters must be at least 3 and less than 250 symbols")
        .isString()
        .withMessage("Name characters must be string"),
    (0, express_validator_1.body)("lat", "lat field is required")
        .notEmpty()
        .withMessage("lat is required!")
        .trim()
        .withMessage("Empty sapce is not allowed")
        .isNumeric()
        .withMessage("Latitude must be numeric"),
    (0, express_validator_1.body)("lng", "longitude field is required")
        .notEmpty()
        .withMessage("longitude is required!")
        .trim()
        .withMessage("Empty sapce is not allowed")
        .isNumeric()
        .withMessage("longitude must be numeric"),
    (0, express_validator_1.body)("company_summary", "company_summary field is required")
        .optional()
        .trim()
        .isString()
        .withMessage("company_summary must be numeric"),
];
exports.companyPostValidator = companyPostValidator;
const companyPatchValidator = [
    (0, express_validator_1.param)("id").isUUID(4).withMessage("Param must be sent in UUID4 version"),
    (0, express_validator_1.body)("company_name")
        .optional()
        .custom((value, {}) => {
        // Check if the 'name' field is provided (not empty)
        if (value) {
            if (typeof value === "string") {
                // Perform length validation only when 'name' is provided and is a string
                return value.length >= 3 && value.length <= 250;
            }
            return false; // If 'name' is provided but not a string
        }
        return true; // If 'name' is not provided (optional)
    }),
    (0, express_validator_1.body)("company_sub_name")
        .optional()
        .custom((value, {}) => {
        // Check if the 'name' field is provided (not empty)
        if (value) {
            if (typeof value === "string") {
                // Perform length validation only when 'name' is provided and is a string
                return value.length >= 3 && value.length <= 250;
            }
            return false; // If 'name' is provided but not a string
        }
        return true; // If 'name' is not provided (optional)
    }),
    (0, express_validator_1.body)("company_summary")
        .optional()
        .custom((value, {}) => {
        // Check if the 'name' field is provided (not empty)
        if (value) {
            if (typeof value === "string") {
                // Perform length validation only when 'name' is provided and is a string
                return value.length >= 3 && value.length <= 250;
            }
            return false; // If 'name' is provided but not a string
        }
        return true; // If 'name' is not provided (optional)
    }),
    (0, express_validator_1.body)("lat")
        .optional()
        .custom((value, {}) => {
        // Check if the 'name' field is provided (not empty)
        if (value) {
            if (typeof value === "number") {
                // Perform length validation only when 'name' is provided and is a string
                return true;
            }
            return false; // If 'name' is provided but not a string
        }
        return true; // If 'name' is not provided (optional)
    }),
    (0, express_validator_1.body)("lng")
        .optional()
        .custom((value, {}) => {
        // Check if the 'name' field is provided (not empty)
        if (value) {
            if (typeof value === "number") {
                // Perform length validation only when 'name' is provided and is a string
                return true;
            }
            return false; // If 'name' is provided but not a string
        }
        return true; // If 'name' is not provided (optional)
    }),
];
exports.companyPatchValidator = companyPatchValidator;
