const User = require("../models/user.model");

exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, password, birth_date } = req.body;
        if (!username || !password || !birth_date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.createOne({ username, password, birth_date });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { username, password, birth_date, is_banned } = req.body;

        if (!username || !password || !birth_date || is_banned === null) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.updateOne(userId, {
            username,
            password,
            birth_date,
            is_banned,
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const deletedCount = await User.deleteOne(userId);

        if (deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
