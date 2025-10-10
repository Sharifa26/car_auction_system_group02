const Auction = require('../models/auctions');
const Bid = require('../models/bids');
const Dealer = require('../models/dealers');

const createAuction = async (req, res) => {
  try {
    const { carInfo, basePrice } = req.body;
    if (!carInfo || !basePrice) return res.status(400).json({ message: 'carInfo and basePrice are required' });

    const car = await Auction.findOne({ carInfo });
    if (car) return res.status(404).json({ message: 'The car is already in auction' });

    const auction = new Auction({ carInfo, basePrice });
    await auction.save();
    res.status(201).json({ message: 'Auction created', auction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAuctionStatus = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { status } = req.body;
    const auction = await Auction.findById(auctionId);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    auction.status = status;

    // Automatically determine winner if auction ended
    if (status === 'ended') {
      const bids = await Bid.find({ auctionId: auctionId }).sort({ bidAmount: -1, timePlaced: 1 });
      auction.winner = bids.length > 0 ? bids[0].dealerId : null;
    }

    await auction.save();
    res.json({ message: 'Auction status updated', auction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAuctionWinner = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const auction = await Auction.findById(auctionId);

    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (auction.status !== 'ended') return res.status(400).json({ message: 'Auction has not ended yet' });

    if (!auction.winner) return res.json({ message: 'No bids placed for this auction' });

    const dealer = await Dealer.findById(auction.winner);

    res.json({ message: 'Auction winner', winner: dealer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createAuction,
  updateAuctionStatus,
  getAuctionWinner
};
