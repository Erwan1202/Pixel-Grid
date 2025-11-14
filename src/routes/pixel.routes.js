const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const pixelController = require("../controllers/pixel.controller");
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
 * /pixels:
 *   get:
 *     tags: [Pixel]
 *     summary: List all pixels
 *     responses:
 *       200:
 *         description: A list of pixels.
 */
router.get(
    "/",
    pixelController.listPixels
);

/**
 * @openapi
 * /pixels/{id}:
 *   get:
 *     tags: [Pixel]
 *     summary: Get a specific pixel by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The pixel ID
 *     responses:
 *       200:
 *         description: Pixel retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Pixel not found.
 */
router.get(
    "/:id",
    validateId,
    handleValidationErrors,
    pixelController.getPixel
);

/**
 * @openapi
 * /pixels:
 *   post:
 *     tags: [Pixel]
 *     summary: Create a new pixel
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
 *         description: Pixel created successfully.
 *       400:
 *         description: Validation error.
 */
router.post(
    "/",
    validateCreatePixel,
    handleValidationErrors,
    pixelController.createPixel
);

/**
 * @openapi
 * /pixels/{id}:
 *   put:
 *     tags: [Pixel]
 *     summary: Update an existing pixel
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The pixel ID
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
 *         description: Pixel updated successfully.
 *       400:
 *         description: Invalid ID or validation error.
 *       404:
 *         description: Pixel not found.
 */
router.put(
    "/:id",
    validateId,
    validateUpdatePixel,
    handleValidationErrors,
    pixelController.updatePixel
);

/**
 * @openapi
 * /pixels/{id}:
 *   delete:
 *     tags: [Pixel]
 *     summary: Delete a pixel (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The pixel ID
 *     responses:
 *       200:
 *         description: Pixel deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (admin role required).
 *       404:
 *         description: Pixel not found.
 */
router.delete(
    "/:id",
    authenticate,
    validateId,
    handleValidationErrors,
    requireRole("admin"),
    pixelController.deletePixel
);

module.exports = router;
