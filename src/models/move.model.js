const mongoose = require("mongoose");

// TODO FIX THIS GARBAGE

const pixelChangeSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    color: { type: String, required: true },
    placed_by: { type: Number, required: true },
    placed_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("pixelChangeSchema", pixelChangeSchema);
