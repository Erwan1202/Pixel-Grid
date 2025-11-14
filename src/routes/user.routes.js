const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controllers/user.controller");
const {
    validateId,
    handleValidationErrors,
} = require("../middlewares/validator");
const {
    validateCreateUser,
    validateUpdateUser,
} = require("../middlewares/validators/user.validator");

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: List all users
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get(
    "/",
    userController.listUsers
);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get a specific user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: User not found.
 */
router.get(
    "/:id",
    validateId,
    handleValidationErrors,
    userController.getUser
);

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
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
 *         description: User created successfully.
 *       400:
 *         description: Validation error.
 */
router.post(
    "/",
    validateCreateUser,
    handleValidationErrors,
    userController.createUser
);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update an existing user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johnsmith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johnsmith@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewP@ssw0rd!
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid ID or validation error.
 *       404:
 *         description: User not found.
 */
router.put(
    "/:id",
    validateId,
    validateUpdateUser,
    handleValidationErrors,
    userController.updateUser
);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 *       404:
 *         description: User not found.
 */
router.delete(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    userController.deleteUser
);

module.exports = router;
