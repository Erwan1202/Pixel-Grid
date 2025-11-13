const mongoose = require("mongoose");

const mongoURI = process.env.DB_MONGO_URI;

const connectMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connexion à MongoDB réussie.");
    } catch (err) {
        console.error("Erreur de connexion à MongoDB", err.message);
        process.exit(1);
    }
};

module.exports = connectMongo;
