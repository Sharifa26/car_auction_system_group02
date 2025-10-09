const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Dealer name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Dealer email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        auctionsParticipated: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "auctions",
            },
        ],
        bidsPlaced: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "bids",
            },
        ],
    },
    { timestamps: true }
);

const dealers = mongoose.model("dealers", dealerSchema);
module.exports = dealers;
