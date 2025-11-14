const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const moveController = require("../controllers/move.controller");
const {
    validateId,
    handleValidationErrors,
} = require("../middlewares/validator");
const {
    validateCreatePixel,
    validateUpdatePixel,
} = require("../middlewares/validators/pixel.validator");

/**
 * @openapi
 * /moves:
 *   get:
 *     tags: [Move]
 *     summary: List all moves
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of moves.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 */
router.get(
    "/",
    authenticate,
    requireRole("admin"),
    moveController.listMoves
);

/**
 * @openapi
 * /moves/{id}:
 *   get:
 *     tags: [Move]
 *     summary: Get a specific move by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The move ID
 *     responses:
 *       200:
 *         description: Move retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Move not found.
 */
router.get(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    moveController.getMove
);

/**
 * @openapi
 * /moves:
 *   post:
 *     tags: [Move]
 *     summary: Create a new move
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - x
 *               - y
 *               - color
 *             properties:
 *               x:
 *                 type: integer
 *                 example: 10
 *               y:
 *                 type: integer
 *                 example: 20
 *               color:
 *                 type: string
 *                 example: "#FF0000"
 *     responses:
 *       201:
 *         description: Move created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 */
router.post(
    "/",
    authenticate,
    validateCreatePixel,
    handleValidationErrors,
    requireRole("admin"),
    moveController.createMove
);

/**
 * @openapi
 * /moves/{id}:
 *   put:
 *     tags: [Move]
 *     summary: Update an existing move
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The move ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x:
 *                 type: integer
 *                 example: 15
 *               y:
 *                 type: integer
 *                 example: 25
 *               color:
 *                 type: string
 *                 example: "#00FF00"
 *     responses:
 *       200:
 *         description: Move updated successfully.
 *       400:
 *         description: Invalid ID or validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Move not found.
 */
router.put(
    "/:id",
    authenticate,
    validateId,
    validateUpdatePixel,
    handleValidationErrors,
    requireRole("admin"),
    moveController.updateMove
);

/**
 * @openapi
 * /moves/{id}:
 *   delete:
 *     tags: [Move]
 *     summary: Delete a move (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The move ID
 *     responses:
 *       200:
 *         description: Move deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 *       404:
 *         description: Move not found.
 */
router.delete(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    moveController.deleteMove
);

module.exports = router;
