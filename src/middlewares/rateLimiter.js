const rateLimit = require('express-rate-limit');

const PIXEL_COOLDOWN_MINUTES = 1;
const MAX_REQUESTS = 1;
const WINDOW_MS = PIXEL_COOLDOWN_MINUTES * 60 * 1000;

const pixelRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,

  message: {
    message: `Vous ne pouvez placer qu'un pixel toutes les ${PIXEL_COOLDOWN_MINUTES} minute(s).`
  },

  headers: true,
});

module.exports = pixelRateLimiter;