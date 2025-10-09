const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        make: {
            type: String,
            required: [true, "Car make is required"],
            trim: true,
        },
        model: {
            type: String,
            required: [true, "Car model is required"],
            trim: true,
        },
        year: {
            type: Number,
            required: [true, "Car year is required"],
        },
    },
    { timestamps: true }
);

const cars = mongoose.model("cars", carSchema);
module.exports = cars;
