const express = require('express');
const router = express.Router();
const { placeBid, getBidsByAuction } = require('../controllers/bidController');
const adminAuth = require('../middlewares/adminAuth');


router.post('/:auctionId/placeBid', adminAuth, placeBid);
router.get('/:auctionId/bids', adminAuth, getBidsByAuction);

module.exports = router;
