import { body, param } from "express-validator";


const companyPostValidator = [
  body("company_name", "Name field is required")
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
  body("company_sub_name", "company_sub_name field is required")
    .optional()
    .trim()
    .isLength({
      max: 250,
      min: 3,
    })
    .withMessage("Name characters must be at least 3 and less than 250 symbols")
    .isString()
    .withMessage("Name characters must be string"),
  body("lat", "lat field is required")
    .notEmpty()
    .withMessage("lat is required!")
    .trim()
    .withMessage("Empty sapce is not allowed")
    .isNumeric()
    .withMessage("Latitude must be numeric"),
  body("lng", "longitude field is required")
    .notEmpty()
    .withMessage("longitude is required!")
    .trim()
    .withMessage("Empty sapce is not allowed")
    .isNumeric()
    .withMessage("longitude must be numeric"),
  body("company_summary", "company_summary field is required")
    .optional()
    .trim()
    .isString()
    .withMessage("company_summary must be numeric"),
];
const companyPatchValidator = [
  param("id").isUUID(4).withMessage("Param must be sent in UUID4 version"),
  body("company_name")
    .optional()
    .custom((value: string, {}) => {
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
  body("company_sub_name")
    .optional()
    .custom((value: string, {}) => {
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
  body("company_summary")
    .optional()
    .custom((value: string, {}) => {
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
  body("lat")
    .optional()
    .custom((value: string, {}) => {
      // Check if the 'name' field is provided (not empty)
      if (value) {
        if (typeof value === "number") {
          // Perform length validation only when 'name' is provided and is a string
          return true
        }
        return false; // If 'name' is provided but not a string
      }
      return true; // If 'name' is not provided (optional)
    }),
  body("lng")
    .optional()
    .custom((value: string, {}) => {
      // Check if the 'name' field is provided (not empty)
      if (value) {
        if (typeof value === "number") {
          // Perform length validation only when 'name' is provided and is a string
          return true
        }
        return false; // If 'name' is provided but not a string
      }
      return true; // If 'name' is not provided (optional)
    }),
];

export { companyPostValidator, companyPatchValidator };
