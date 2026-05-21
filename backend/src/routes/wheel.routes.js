const express = require("express");

const router = express.Router();

const wheelController = require("../controllers/wheel.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", wheelController.createWheel);
router.get("/active", wheelController.getActiveWheel);  
router.post("/:id/join", authMiddleware, wheelController.joinWheel);

module.exports = router;