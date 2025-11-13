const Pixel = require("../models/pixel.model");

exports.listPixels = async (req, res) => {
    try {
        const pixels = await Pixel.findAll();
        res.status(200).json(pixels);
    } catch (err) {
        res.status(500).json({ error: err.messgage });
    }
};

exports.getPixel = async (req, res) => {
    try {
        const pixelId = Number(req.params.id);
        const pixel = await Pixel.findById(pixelId);

        if (!pixel) {
            return res.status(404).json({ error: "Pixel not found" });
        }

        res.status(200).json(pixel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPixel = async (req, res) => {
    try {
        const { x, y, color, placed_by } = req.body;
        if (!x || !y || !color || !placed_by) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const pixel = await Pixel.createOne({ x, y, color, placed_by });
        res.status(201).json(pixel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePixel = async (req, res) => {
    try {
        const pixelId = Number(req.params.id);
        const { x, y, color, placed_by } = req.body;

        if (!x || !y || !color || !placed_by) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const pixel = await Pixel.updateOne(pixelId, {
            x,
            y,
            color,
            placed_by,
        });

        if (!pixel) {
            return res.status(404).json({ error: "Pixel not found" });
        }

        res.status(200).json(pixel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePixel = async (req, res) => {
    try {
        const pixelId = Number(req.params.id);
        const deletedCount = await Pixel.deleteOne(pixelId);

        if (deletedCount === 0) {
            return res.status(404).json({ error: "Pixel not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
