const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const adminController = require("../controllers/admin.controller");
const {
    validateId,
    handleValidationErrors,
} = require("../middlewares/validator");
const {
    validateCreateBan,
    validateUpdateBan,
} = require("../middlewares/validators/admin.validator");

/**
 * @openapi
 * /admin/bans:
 *   get:
 *     tags: [AdminBans]
 *     summary: List all bans
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all bans.
 *       401:
 *         description: Unauthorized (missing or invalid token).
 *       403:
 *         description: Forbidden (admin role required).
 */
router.get(
    "/bans",
    authenticate,
    requireRole("admin"),
    adminController.listBans
);

/**
 * @openapi
 * /admin/bans/{id}:
 *   get:
 *     tags: [AdminBans]
 *     summary: Get a specific ban by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ban to fetch
 *     responses:
 *       200:
 *         description: Ban details returned.
 *       400:
 *         description: Invalid ID format.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 *       404:
 *         description: Ban not found.
 */
router.get(
    "/bans/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    adminController.getBan
);

/**
 * @openapi
 * /admin/bans:
 *   post:
 *     tags: [AdminBans]
 *     summary: Create a new ban
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "abc123"
 *               reason:
 *                 type: string
 *                 example: "Violation of rules"
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-01T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Ban created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 */
router.post(
    "/bans",
    authenticate,
    validateCreateBan,
    handleValidationErrors,
    requireRole("admin"),
    adminController.createBan
);

/**
 * @openapi
 * /admin/bans/{id}:
 *   put:
 *     tags: [AdminBans]
 *     summary: Update an existing ban
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Updated reason"
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Ban updated successfully.
 *       400:
 *         description: Validation error or invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 *       404:
 *         description: Ban not found.
 */
router.put(
    "/bans/:id",
    authenticate,
    validateId,
    validateUpdateBan,
    handleValidationErrors,
    requireRole("admin"),
    adminController.updateBan
);

/**
 * @openapi
 * /admin/bans/{id}:
 *   delete:
 *     tags: [AdminBans]
 *     summary: Delete a ban by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ban deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 *       404:
 *         description: Ban not found.
 */
router.delete(
    "/bans/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    adminController.deleteBan
);

module.exports = router;
