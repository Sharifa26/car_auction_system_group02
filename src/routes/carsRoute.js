const express = require('express');
const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const adminAuth = require('../middlewares/adminAuth');
const router = express.Router();

router.post("/", adminAuth, createCar);
router.get("/", adminAuth, getAllCars);
router.get("/:id", adminAuth, getCarById);
router.patch("/:id", adminAuth, updateCar);
router.delete("/:id", adminAuth, deleteCar);

module.exports = router;