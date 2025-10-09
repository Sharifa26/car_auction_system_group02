const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
    {
        bidAmount: {
            type: Number,
            required: true,
        },
        previousBid: {
            type: Number,
            default: 0,
        },
        timePlaced: {
            type: Date,
            default: Date.now,
        },
        auctionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auctions",
            required: true,
        },
        dealerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "dealers",
            required: true,
        },
    },
    { timestamps: true }
);

const bids = mongoose.model("bids", bidSchema);
module.exports = bids
