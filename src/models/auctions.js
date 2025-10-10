

const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  carInfo: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'ended'],
    default: 'pending'
  },
  createdBy: {
    type: String,
    default: 'admin' // since only admin can create
  }
});


const auctions = mongoose.model("auctions", auctionSchema);
module.exports = auctions;
