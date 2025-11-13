const Move = require("../models/move.model");

// TODO FIX ID GARBAGE

exports.listMoves = async (req, res) => {
    try {
        const moves = await Move.find();
        res.status(200).json(moves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMove = async (req, res) => {
    try {
        const { moveId } = req.params;
        const move = await Move.findById(moveId);

        if (!move) {
            return res.status(404).json({ error: "Move not found" });
        }

        res.status(200).json(move);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMove = async (req, res) => {
    try {
        const { x, y, color, placed_by } = req.body;
        if (!x || !y || !color || !placed_by) {
            return res.status(404).json({ error: "All fields are required" });
        }

        const move = await Move.create({ x, y, color, placed_by });
        res.status(201).json(move);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMove = async (req, res) => {
    try {
        const { moveId } = req.params;
        const { x, y, color, placed_by } = req.body;

        if (!x || !y || !color || !placed_by) {
            return res.status(404).json({ error: "All fields are required" });
        }

        const move = await Move.findByIdAndUpdate(
            moveId,
            {
                x,
                y,
                color,
                placed_by,
            },
            { new: true }
        );

        if (!move) {
            return res.status(404).json({ error: "Move not found" });
        }

        res.status(200).json(move);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMove = async (req, res) => {
    return;
};
