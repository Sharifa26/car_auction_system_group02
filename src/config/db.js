const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        const db = process.env.NODE_ENV === 'test' ? 'carAutionTest' : 'carAution';
        await mongoose.connect(uri, {
            dbName: db,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
