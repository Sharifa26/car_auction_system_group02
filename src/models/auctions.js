const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  carInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cars',
    required: true,
  },
  basePrice: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now(),
    required: true
  },
  endTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'ended'],
    default: 'pending'
  },
  createdBy: {
    type: String,
    default: 'admin' // since only admin can create
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dealers'
  }
});


const auctions = mongoose.model("auctions", auctionSchema);
module.exports = auctions;
