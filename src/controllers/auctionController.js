const Auction = require('../models/auctions');
const Bid = require('../models/bids');

const createAuction = async (req, res) => {
  try {
    const { carInfo, basePrice, startTime, endTime } = req.body;
    const auction = new Auction({ carInfo, basePrice, startTime, endTime });
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
      const bids = await Bid.find({ auction: auctionId }).sort({ amount: -1, bidTime: 1 });
      auction.winner = bids.length > 0 ? bids[0]._id : null;
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
    const auction = await Auction.findById(auctionId).populate('winner');

    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (auction.status !== 'ended') return res.status(400).json({ message: 'Auction has not ended yet' });

    if (!auction.winner) return res.json({ message: 'No bids placed for this auction' });

    res.json({ message: 'Auction winner', winner: auction.winner });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createAuction,
  updateAuctionStatus,
  getAuctionWinner
};
