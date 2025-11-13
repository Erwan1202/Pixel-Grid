const { body } = require("express-validator");

// Validation rules for registering a user
exports.validateRegister = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),

    body("age")
        .notEmpty()
        .withMessage("Age is required")
        .isInt({ min: 13, max: 120 })
        .withMessage("Age must be between 13 and 120"),
];

// Validation rules for login-ing a user
exports.validateLogin = [
    body("username").trim().notEmpty().withMessage("Username is required"),

    body("password").notEmpty().withMessage("Password is required"),
];
