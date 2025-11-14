require("dotenv").config();
const { body, param } = require("express-validator");

exports.validateCreateCanvas = [
    body("name")
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string"),

    body("width")
        .notEmpty()
        .withMessage("width is required")
        .isInt({
            min: Number(process.env.CANVAS_MIN_WIDTH),
            max: Number(process.env.CANVAS_MAX_WIDTH)
        })
        .withMessage("width must be an integer within allowed limits"),

    body("height")
        .notEmpty()
        .withMessage("height is required")
        .isInt({
            min: Number(process.env.CANVAS_MIN_HEIGHT),
            max: Number(process.env.CANVAS_MAX_HEIGHT)
        })
        .withMessage("height must be an integer within allowed limits"),
];

exports.validateUpdateCanvas = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("id must be a valid integer"),

    body("name")
        .optional()
        .isString()
        .withMessage("name must be a string"),

    body("width")
        .optional()
        .isInt({
            min: Number(process.env.CANVAS_MIN_WIDTH),
            max: Number(process.env.CANVAS_MAX_WIDTH)
        })
        .withMessage("width must be an integer within allowed limits"),

    body("height")
        .optional()
        .isInt({
            min: Number(process.env.CANVAS_MIN_HEIGHT),
            max: Number(process.env.CANVAS_MAX_HEIGHT)
        })
        .withMessage("height must be an integer within allowed limits"),
];
