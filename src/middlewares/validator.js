const { validationResult, param } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.validateId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer"),
];

exports.handleValidationErrors = handleValidationErrors;
