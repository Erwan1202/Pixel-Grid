require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.DB_MONGO_URI;

const connectMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB: ", err.message);
        process.exit(1);
    }
};

module.exports = connectMongo;
