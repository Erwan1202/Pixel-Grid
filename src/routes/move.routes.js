const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const moveController = require("../controllers/move.controller");
const {
    validateId,
    handleValidationErrors,
} = require("../middlewares/validators");
const {
    validateCreateMove,
    validateUpdateMove
} = require("../middlewares/validators/move.validator");

// GET /moves - List all moves
router.get(
    "/",
    authenticate,
    requireRole("admin"),
    moveController.listMoves
);

// GET /moves/:id - Get a specific move
router.get(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    moveController.getMove
);

// POST /moves - Create a new move
router.post(
    "/",
    authenticate,
    validateCreateMove,
    handleValidationErrors,
    requireRole("admin"),
    moveController.createMove
);

// PUT /moves/:id - Update a move
router.put(
    "/:id",
    authenticate,
    validateId,
    validateUpdateMove,
    handleValidationErrors,
    requireRole("admin"),
    moveController.updateMove
);

// DELETE /moves/:id - Delete a move
router.delete(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    moveController.deleteMove
);

module.exports = router;
