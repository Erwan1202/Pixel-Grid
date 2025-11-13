const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");

router.post("/register", ctrl.registerUser);
router.post("/login", ctrl.loginUser);

module.exports = router;
