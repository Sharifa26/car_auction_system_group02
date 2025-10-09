const express = require('express');
const router = express.Router();
const { placeBid, getBidsByAuction } = require('../controllers/bidcontroller');


router.post('/:auctionId/placeBid', placeBid);

router.get('/:auctionId/bids', getBidsByAuction);

module.exports = router;
