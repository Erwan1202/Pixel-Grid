const Pixel = require("../models/Pixel");
const PixelLog = require("../models/PixelLog");

async function getGridState() {
    return Pixel.getAll();
}

async function placePixel(x, y, color, userId) {
    const logEntry = new PixelLog({ x, y, color, user_id: userId });
    await logEntry.save();

    await Pixel.place(x, y, color, userId);

    return { x, y, color };
}

module.exports = {
    getGridState,
    placePixel,
};
