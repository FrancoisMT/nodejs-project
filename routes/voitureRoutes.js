const express = require("express");
const router = express.Router();
const voitureController = require("../controllers/voitureController");

router.get("/", voitureController.getAllCars);
router.get("/user/:userId", voitureController.getCarsByUserId);
router.post("/", voitureController.createVoiture);

module.exports = router;
