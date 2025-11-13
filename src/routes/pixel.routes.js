const router = require("express").Router();
const ctrl = require("../controllers/pixels.controller");

router.get("/", ctrl.listPixels);
router.get("/:id", ctrl.getPixel);
router.post("/", ctrl.createPixel);
router.put("/:id", ctrl.updatePixel);
router.delete("/:id", ctrl.deletePixel);

module.exports = router;
