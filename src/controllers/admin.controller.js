const Ban = require("../models/ban.model");

exports.listBans = async (req, res) => {
    try {
        const bans = await Ban.findAll();
        res.status(200).json(bans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBan = async (req, res) => {
    try {
        const banId = Number(req.params.id);
        const ban = await Ban.findById(banId);

        if (!ban) {
            return res.status(404).json({ error: "Ban not found" });
        }

        res.status(200).json(ban);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBan = async (req, res) => {
    try {
        const { reason, user_id, expires_at } = req.body;
        if (!reason || !user_id || !expires_at) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const ban = await Ban.createOne({ reason, user_id, expires_at });
        res.status(201).json(ban);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBan = async (req, res) => {
    try {
        const banId = Number(req.params.id);
        const { reason, user_id, expires_at } = req.body;

        if (!reason || !user_id || !expires_at) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const ban = await Ban.updateOne(banId, { reason, user_id, expires_at });

        if (!ban) {
            return res.status(404).json({ error: "Ban not found" });
        }

        res.status(200).json(ban);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBan = async (req, res) => {
    try {
        const banId = Number(req.params.id);
        const deletedCount = await Ban.deleteOne(banId);

        if (deletedCount === 0) {
            return res.status(404).json({ error: "ban not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
