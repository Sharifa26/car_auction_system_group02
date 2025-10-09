const express = require('express');
const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/", verifyToken, createCar);
router.get("/", verifyToken, getAllCars);
router.get("/:id", verifyToken, getCarById);
router.patch("/:id", verifyToken, updateCar);
router.delete("/:id", verifyToken, deleteCar);

module.exports = router;