const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const moveController = require("../controllers/move.controller");

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
    requireRole("admin"),
    moveController.getMove
);

// POST /moves - Create a move
router.post(
    "/",
    authenticate,
    requireRole("admin"),
    moveController.createMove
);

// PUT /moves/:id - Update a move
router.put(
    "/:id",
    authenticate,
    requireRole("admin"),
    moveController.updateMove
);

// DELETE /moves/:id - Delete a move
router.delete(
    "/:id",
    authenticate,
    requireRole("admin"),
    moveController.deleteMove
);

module.exports = router;
