require("dotenv").config();
const rateLimit = require("express-rate-limit");

const WINDOW_MS = process.env.PIXEL_COOLDOWN_MINUTES * 60 * 1000;

const pixelRateLimiter = rateLimit({
    windowMs: WINDOW_MS,
    max: process.env.MAX_REQUESTS,
    message: {
        message: `Vous ne pouvez placer qu'un pixel toutes les ${PIXEL_COOLDOWN_MINUTES} minute(s).`,
    },
    headers: true,
});

module.exports = pixelRateLimiter;
