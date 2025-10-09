const express = require('express');
const router = express.Router();
const { createAuction, updateAuctionStatus, getAuctionWinner } = require('../controllers/auctionController');


// Create a new auction (Admin only)
router.post('/createAuction', adminAuth, createAuction);

// Update auction status (Admin only)
router.patch('/status/:auctionId', adminAuth, updateAuctionStatus);

// Get the winner of an auction
router.get('/:auctionId/winner', getAuctionWinner);

module.exports = router;
