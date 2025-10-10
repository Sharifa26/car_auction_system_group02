const Bid = require('../models/bids');
const Auction = require('../models/auctions');

const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { amount } = req.body;
    const dealerId = req.dealerId;

    const auction = await Auction.findById(auctionId);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (auction.status !== 'active') return res.status(400).json({ message: 'Auction not active' });

    const bid = new Bid({ auction: auctionId, dealer: dealerId, amount });
    await bid.save();
    res.status(201).json({ message: 'Bid placed', bid });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBidsByAuction = async (req, res) => {
  try {
    const bids = await Bid.find({ auction: req.params.auctionId }).sort({ amount: -1 });
    res.json(bids);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Export all functions together at the end
module.exports = {
  placeBid,
  getBidsByAuction
};
