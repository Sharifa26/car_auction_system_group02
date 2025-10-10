const Bid = require('../models/bids');
const Auction = require('../models/auctions');
const Dealer = require('../models/dealers');

const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { amount, dealerId } = req.body;
    if (!amount || !dealerId) return res.status(400).json({ message: 'amount and dealerId are required' });

    const auction = await Auction.findById(auctionId);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (auction.basePrice >= amount) return res.status(400).json({ message: 'Bid amount must be higher than base price' });
    if (auction.status === 'ended') return res.status(400).json({ message: 'Auction has ended' });
    if (auction.status !== 'active') return res.status(400).json({ message: 'Auction not active' });

    const bid = new Bid({ auctionId: auctionId, dealerId: dealerId, amount, bidAmount: amount });
    const bids = await bid.save();

    // Add bid to dealer's bidsPlaced
    const dealer = await Dealer.findById(dealerId);
    dealer.bidsPlaced.push(bids._id);
    dealer.auctionsParticipated.push(auctionId);
    await dealer.save();

    res.status(201).json({ message: 'Bid placed', bid });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBidsByAuction = async (req, res) => {
  try {
    const bids = await Bid.find({ auctionId: req.params.auctionId }).sort({ bidAmount: -1 });
    res.status(200).json({ total: bids.length, bids });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Export all functions together at the end
module.exports = {
  placeBid,
  getBidsByAuction
};
