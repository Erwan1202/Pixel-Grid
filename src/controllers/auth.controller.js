const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
    try {
        const { username, password, birth_date } = req.body;
        if (!username || !password || !birth_date) {
            return res.status(400).json({ err: "All fields are requried" });
        }

        const user = await User.createOne({ username, password, birth_date });

        res.status(201).json(user);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { sub: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
