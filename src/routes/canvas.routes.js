const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const canvasController = require("../controllers/canvas.controller");
const {
    validateId,
    handleValidationErrors,
} = require("../middlewares/validator");
const {
    validateCreateCanvas,
    validateUpdateCanvas,
} = require("../middlewares/validators/canvas.validator");

/**
 * @openapi
 * /api/canvases:
 *   get:
 *     tags: [Canvas]
 *     summary: List all canvases
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of canvases.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 */
router.get(
    "/",
    authenticate,
    requireRole("admin"),
    canvasController.listCanvases
);

/**
 * @openapi
 * /api/canvases/{id}:
 *   get:
 *     tags: [Canvas]
 *     summary: Get a specific canvas by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The canvas ID
 *     responses:
 *       200:
 *         description: Canvas retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Canvas not found.
 */
router.get(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    canvasController.getCanvas
);

/**
 * @openapi
 * /api/canvases:
 *   post:
 *     tags: [Canvas]
 *     summary: Create a new canvas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - width
 *               - height
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Home Page Layout"
 *               width:
 *                 type: number
 *                 example: 1920
 *               height:
 *                 type: number
 *                 example: 1080
 *     responses:
 *       201:
 *         description: Canvas created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.post(
    "/",
    authenticate,
    validateCreateCanvas,
    handleValidationErrors,
    requireRole("admin"),
    canvasController.createCanvas
);

/**
 * @openapi
 * /api/canvases/{id}:
 *   put:
 *     tags: [Canvas]
 *     summary: Update an existing canvas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The canvas ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Layout"
 *               width:
 *                 type: number
 *                 example: 1280
 *               height:
 *                 type: number
 *                 example: 720
 *     responses:
 *       200:
 *         description: Canvas updated successfully.
 *       400:
 *         description: Invalid ID or validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Canvas not found.
 */
router.put(
    "/:id",
    authenticate,
    validateId,
    validateUpdateCanvas,
    handleValidationErrors,
    requireRole("admin"),
    canvasController.updateCanvas
);

/**
 * @openapi
 * /api/canvases/{id}:
 *   delete:
 *     tags: [Canvas]
 *     summary: Delete a canvas by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The canvas ID
 *     responses:
 *       200:
 *         description: Canvas deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Canvas not found.
 */
router.delete(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    canvasController.deleteCanvas
);

module.exports = router;
