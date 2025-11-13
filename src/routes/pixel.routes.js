const express = require("express");
const router = express.Router();
const pixelController = require("../controllers/pixels.controller");
const {
    validateId,
    handleValidationErrors,
} = require("../middlewares/validator");
const {
    validateCreatePixel,
    validateUpdatePixel,
} = require("../middlewares/validators/pixel.validator");

// GET /pixels - List all pixels
router.get("/", pixelController.listPixels);

// GET /pixels/:id - Get a specific pixel
router.get(
    "/:id",
    validateId,
    handleValidationErrors,
    pixelController.ctrl.getPixel
);

// POST /pixels/:id - Create a new pixel
router.post(
    "/",
    validateCreatePixel,
    handleValidationErrors,
    pixelController.createPixel
);

// PUT /pixels/:id - Update a pixel
router.put(
    "/:id",
    validateUpdatePixel,
    handleValidationErrors,
    pixelController.updatePixel
);

// DELETE /pixels/:id - Delete a pixel
router.delete(
    "/:id",
    validateId,
    handleValidationErrors,
    pixelController.deletePixel
);

module.exports = router;
