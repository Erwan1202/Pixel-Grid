const { body, param } = require("express-validator");

exports.validateCreateUser = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),

    body("birth_date")
        .isISO8601()
        .withMessage("Birth date must be a valid date in YYYY-MM-DD format")
        .custom((value) => {
            const year = new Date(value).getFullYear();
            if (year < 1950 || year > 2005) {
                throw new Error("Birth date must be between 1950 and 2005");
            }
            return true;
        }),
];

exports.validateUpdateUser = [
    body("username")
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),

    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),

    body("birth_date")
        .isISO8601()
        .withMessage("Birth date must be a valid date in YYYY-MM-DD format")
        .custom((value) => {
            const year = new Date(value).getFullYear();
            if (year < 1950 || year > 2005) {
                throw new Error("Birth date must be between 1950 and 2005");
            }
            return true;
        }),

    body("is_banned")
        .optional()
        .isBoolean()
        .withMessage("is_banned must be a boolean value"),

    body("role")
        .optional()
        .isIn(["user", "admin", "moderator"])
        .withMessage("Role must be one of: user, admin, moderator"),
];
