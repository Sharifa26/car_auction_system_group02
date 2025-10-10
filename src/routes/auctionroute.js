const express = require('express');
const router = express.Router();
const { createAuction, updateAuctionStatus, getAuctionWinner } = require('../controllers/auctionController');
const adminAuth = require('../middlewares/adminAuth');


router.post('/createAuction', adminAuth, createAuction);
router.patch('/status/:auctionId', adminAuth, updateAuctionStatus);
router.get('/:auctionId/winner', adminAuth, getAuctionWinner);

module.exports = router;
