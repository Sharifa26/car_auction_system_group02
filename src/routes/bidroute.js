const express = require('express');
const router = express.Router();
const { placeBid, getBidsByAuction } = require('../controllers/bidcontroller');
const { dealerAuth } = require('../middlewares/auth'); // ensures only dealers can bid

// Place a bid on an auction (Dealer only)
router.post('/:auctionId/placeBid', dealerAuth, placeBid);

// Get all bids for a specific auction (Dealer only)
router.get('/:auctionId/bids', dealerAuth, getBidsByAuction);

module.exports = router;
