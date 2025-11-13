const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { handleValidationErrors } = require("../middlewares/validator");
const {
    validateRegister,
    validateLogin,
} = require("../middlewares/validators/auth.validator");

// POST /register - Register a user
router.post(
    "/register",
    validateRegister,
    handleValidationErrors,
    authController.registerUser
);

// POST /login - Login a user
router.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    authController.loginUser
);

module.exports = router;
