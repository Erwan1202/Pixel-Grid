const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/roles");
const authenticate = require("../middlewares/authenticate");
const canvasController = require("../controllers/canvas.controller");
const {
    validateId,
    handleValidationError
} = require("../middlewares/validator");
const {
    validateCreateCanvas,
    validateUpdateCanvas
} = require("../middlewares/validators/canvas.validator");

// GET /canvases - List all canvases
router.get(
  "/",
  authenticate,
  requireRole("admin"),
  canvasController.listCanvases
);

// GET /canvases/:id - Get a specific canvas
router.get(
  "/:id",
  authenticate,
  validateId,
  handleValidationErrors,
  requireRole("admin"),
  canvasController.getCanvas
);

// POST /canvases - Create a canvas
router.post(
  "/",
  authenticate,
  validateCreateCanvas,
  handleValidationErrors,
  requireRole("admin"),
  canvasController.createCanvas
);

// PUT /canvases/:id - Update a canvas
router.put(
  "/:id",
  authenticate,
  validateId,
  validateUpdateCanvas,
  handleValidationErrors,
  requireRole("admin"),
  canvasController.updateCanvas
);

// DELETE canvases/:id - Delete a canvas
router.delete(
  "/:id",
  authenticate,
  validateId,
  handleValidationErrors,
  requireRole("admin"),
  canvasController.deleteCanvas
);

module.exports = router;
