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

// GET /users - List all users
router.get("/", userController.listUsers);

// GET /users/:id - Get a specific user
router.get(
    "/:id",
    validateId,
    handleValidationErrors,
    userController.getUser
);

// POST /users - Create a new user
router.post(
    "/",
    validateCreateUser,
    handleValidationErrors,
    userController.createUser
);

// PUT /users/:id - Update a user
router.put(
    "/:id",
    validateUpdateUser,
    handleValidationErrors,
    userController.updateUser
);

// DELETE /users/:id - Delete a user
router.delete(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    userController.deleteUser
);

module.exports = router;
