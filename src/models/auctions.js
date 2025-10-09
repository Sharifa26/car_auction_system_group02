const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
    {
        startingPrice: {
            type: Number,
            required: [true, "Starting price is required"],
        },
        status: {
            type: String,
            enum: ["pending", "started", "ended"],
            default: "pending",
        },
        startTime: {
            type: Date,
            required: [true],
        },
        endTime: {
            type: Date,
            required: true,
        },
        carId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cars",
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

const auctions = mongoose.model("auctions", auctionSchema);
module.exports = auctions;
