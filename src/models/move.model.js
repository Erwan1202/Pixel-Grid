const mongoose = require("mongoose");

const pixelChangeSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    color: { type: String, required: true },
    user_id: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("pixelChangeSchema", pixelLogSchema);
