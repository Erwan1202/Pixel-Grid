require("dotenv").config();
const rateLimit = require("express-rate-limit");

const WINDOW_MS = process.env.PIXEL_COOLDOWN_MINUTES * 60 * 1000;

const rateLimiter = rateLimit({
    windowMs: WINDOW_MS,
    max: process.env.MAX_REQUESTS,
    message: {
        error: `You can only make ${process.env.MAX_REQUESTS} requests every ${process.env.PIXEL_COOLDOWN_MINUTES} minutes.`,
    },
    headers: true,
});

module.exports = rateLimiter;
