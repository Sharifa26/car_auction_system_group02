const app = require("../src/app");
require('dotenv').config();
const connectDB = require("../src/config/db");


const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
    } catch (err) {
        console.error("❌ Server Error:", err.message);
        process.exit(1);
    }
};

startServer();
