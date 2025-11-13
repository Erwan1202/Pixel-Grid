const express = require("express");
const router = express.Router();
const canvasController = require("../controllers/canvas.controller");

// GET /canvases - List all canvases
router.get("/", canvasController.listCanvases);

// GET /canvases - Get a specific canvas
router.get("/:id", canvasController.getCanvas);

// POST /canvases/:id - Create a canvas
router.post("/", canvasController.createCanvas);

// PUT /canvases/:id - Update a canvas
router.put("/:id", canvasController.updateCanvas);

// DELETE canvases/:id - Delete a canvas
router.delete("/:id", canvasController.deleteCanvas);

module.exports = router;
