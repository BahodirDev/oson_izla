import { body, param } from "express-validator";

// Customs
function isValidUUID(uuid: string) {
  // Regular expression to match UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}


const wareHousePostValidator = [
  body("name", "Name field is required")
    .notEmpty()
    .withMessage("Name is required!")
    .trim()
    .withMessage("Empty sapce is not allowed")
    .isLength({
      max: 250,
      min: 5,
    })
    .withMessage("Name characters must be at least 5 and less than 250 symbols")
    .isString()
    .withMessage("Name characters must be string"),
];
const wareHousePatchValidator = [
  param("id").isUUID(4).withMessage("Param must be sent in UUID4 version"),
  body("name")
    .optional()
    .custom((value: string, {}) => {
      // Check if the 'name' field is provided (not empty)
      if (value) {
        if (typeof value === "string") {
          // Perform length validation only when 'name' is provided and is a string
          return value.length >= 5 && value.length <= 250;
        }
        return false; // If 'name' is provided but not a string
      }
      return true; // If 'name' is not provided (optional)
    })
    .withMessage("Name must be between 5 and 250 characters"),
];
const validategetRequestBody = [
  body("pagination").isObject().withMessage("Pagination must be an object"),
  body("pagination.page")
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  body("pagination.limit")
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  body("isdeleted")
    .optional()
    .custom((value, { req }) => {
      // If provided, must be a boolean
      if (value !== null && typeof value !== "boolean") {
        throw new Error("isdeleted must be a boolean");
      }
      return true;
    }),
  body("isactive")
    .optional()
    .custom((value, { req }) => {
      // If provided, must be a boolean
      if (value !== null && typeof value !== "boolean") {
        throw new Error("isactive must be a boolean");
      }
      return true;
    }),
  body("id")
    .optional()
    .custom((value, { req }) => {
      // If provided, must be a valid UUID
      if (value !== null && !isValidUUID(value)) {
        throw new Error("id must be a valid UUID");
      }
      return true;
    }),
];

export {
  wareHousePatchValidator,
  wareHousePostValidator,
  validategetRequestBody,
};
