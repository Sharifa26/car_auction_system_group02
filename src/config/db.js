const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            dbName: "carAution"
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
