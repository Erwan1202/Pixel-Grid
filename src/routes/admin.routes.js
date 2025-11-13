const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const adminController = require("../controllers/admin.controller");

// GET /bans - List all bans
router.get(
    "/bans",
    authenticate,
    requireRole("admin"),
    adminController.listBans
);

// GET /bans/:id - Get a specific ban
router.get(
    "/bans/:id",
    authenticate,
    requireRole("admin"),
    adminController.getBan
);

// POST /bans - Create a new ban
router.post(
    "/bans",
    authenticate,
    requireRole("admin"),
    adminController.createBan
);

// PUT /bans/:id - Update a ban
router.put(
    "/bans/:id",
    authenticate,
    requireRole("admin"),
    adminController.updateBan
);

// DELETE /bans/:id - Delete a ban
router.delete(
    "/bans/:id",
    authenticate,
    requireRole("admin"),
    adminController.deleteBan
);

module.exports = router;
