const express = require("express");

const router = express.Router();

const wheelController = require("../controllers/wheel.controller");

router.post("/create", wheelController.createWheel);
router.get("/active", wheelController.getActiveWheel);  

module.exports = router;