const express = require('express');
const { createDealer, getAllDealers, getDealerById, updateDealer, deleteDealer } = require('../controllers/dealersController');
const adminAuth = require('../middlewares/adminAuth');


const router = express.Router();
router.post("/", adminAuth, createDealer);
router.get("/", adminAuth, getAllDealers);
router.get("/:id", adminAuth, getDealerById);
router.patch("/:id", adminAuth, updateDealer);
router.delete("/:id", adminAuth, deleteDealer);

module.exports = router;