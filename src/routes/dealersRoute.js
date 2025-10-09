const express = require('express');
const { createDealer, getAllDealers, getDealerById, updateDealer, deleteDealer } = require('../controllers/dealersController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post("/", verifyToken, createDealer);
router.get("/", verifyToken, getAllDealers);
router.get("/:id", verifyToken, getDealerById);
router.patch("/:id", verifyToken, updateDealer);
router.delete("/:id", verifyToken, deleteDealer);

module.exports = router;