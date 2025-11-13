const { body, param } = require("express-validator");

// Validation rules for creating a pixel
exports.validateCreatePixel = [
    body("x")
        .notEmpty()
        .withMessage("x is required")
        .isInt({ min: 0 })
        .withMessage("x must be a non-negative integer"),

    body("y")
        .notEmpty()
        .withMessage("y is required")
        .isInt({ min: 0 })
        .withMessage("y must be a non-negative integer"),

    body("color")
        .notEmpty()
        .withMessage("color is required")
        .isString()
        .withMessage("color must be a string")
        .matches(/^#([0-9A-Fa-f]{6})$/)
        .withMessage("color must be a valid hex color code (e.g. #FF5733)"),

    body("placed_by")
        .notEmpty()
        .withMessage("placed_by is required")
        .isInt({ min: 1 })
        .withMessage("placed_by must be a positive integer"),
];

// Validation rules for updating a pixel
exports.validateUpdatePixel = [
    param("id").isInt({ min: 1 }).withMessage("id must be a valid integer"),

    body("x")
        .optional()
        .isInt({ min: 0 })
        .withMessage("x must be a non-negative integer"),

    body("y")
        .optional()
        .isInt({ min: 0 })
        .withMessage("y must be a non-negative integer"),

    body("color")
        .optional()
        .isString()
        .withMessage("color must be a string")
        .matches(/^#([0-9A-Fa-f]{6})$/)
        .withMessage("color must be a valid hex color code (e.g. #FF5733)"),

    body("placed_by")
        .optional()
        .isInt({ min: 1 })
        .withMessage("placed_by must be a positive integer"),
];
