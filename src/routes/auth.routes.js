const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { handleValidationErrors } = require("../middlewares/validator");
const {
    validateRegister,
    validateLogin,
} = require("../middlewares/validators/auth.validator");

/**
 * @openapi
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation error.
 */
router.post(
    "/register",
    validateRegister,
    handleValidationErrors,
    authController.registerUser
);

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *     responses:
 *       200:
 *         description: User logged in successfully (returns JWT token).
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Invalid credentials.
 */
router.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    authController.loginUser
);

module.exports = router;
