const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const refreshTokens = new Set();

const generateTokens = (userId, userRole) => {
    const accessToken = jwt.sign(
        { sub: userId, role: userRole },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = jwt.sign(
        { sub: userId, role: userRole },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );

    return { accessToken, refreshToken };
};

exports.registerUser = async (req, res) => {
    try {
        const { username, password, birth_date } = req.body;
        if (!username || !password || !birth_date) {
            return res.status(400).json({ error: "All fields are required" });
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

        const { accessToken, refreshToken } = generateTokens(
            user.id,
            user.role
        );

        // Store refresh token
        refreshTokens.add(refreshToken);

        res.status(200).json({
            accessToken,
            refreshToken,
            expiresIn: process.env.JWT_EXPIRES_IN || "15m",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token required" });
        }

        // Check if refresh token exists in store
        if (!refreshTokens.has(refreshToken)) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        // Verify refresh token
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    // Remove invalid token from store
                    refreshTokens.delete(refreshToken);
                    return res
                        .status(403)
                        .json({ error: "Invalid or expired refresh token" });
                }

                // Generate new access token
                const newAccessToken = jwt.sign(
                    { sub: decoded.sub, role: decoded.role },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
                );

                res.status(200).json({
                    accessToken: newAccessToken,
                    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
                });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token required" });
        }

        // Remove refresh token from store
        refreshTokens.delete(refreshToken);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
