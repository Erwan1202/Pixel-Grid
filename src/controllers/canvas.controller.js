const Canvas = require("../models/canvas.model");

exports.listCanvases = async (req, res) => {
    try {
        const canvases = await Canvas.findAll();
        res.status(200).json(canvases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCanvas = async (req, res) => {
    try {
        const canvasId = Number(req.params.id);
        const canvas = await Canvas.findById(canvasId);

        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        res.status(200).json(canvas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCanvas = async (req, res) => {
    try {
        const { name, width, height } = req.body;
        if (!name || !width || !height) {
            return res.status(400).json({ error: "All fields are requried" });
        }

        const canvas = await Canvas.createOne({ name, width, height });
        res.status(201).json(canvas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCanvas = async (req, res) => {
    try {
        const canvasId = Number(req.params.id);
        const { name, width, height } = req.body;

        if (!name || !width || !height) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const canvas = await Canvas.updateOne(canvasId, {
            name,
            width,
            height,
        });

        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        res.status(200).json(canvas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCanvas = async (req, res) => {
    try {
        const canvasId = Number(req.params.id);
        const deletedCount = await Canvas.deleteOne(canvasId);

        if (deletedCount === 0) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
