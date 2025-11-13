// src/middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

// 1 minute pour les tests. Vous pourrez mettre 5 ou 10 minutes plus tard.
const PIXEL_COOLDOWN_MINUTES = 1;
const MAX_REQUESTS = 1; // 1 seule requête...
const WINDOW_MS = PIXEL_COOLDOWN_MINUTES * 60 * 1000; // ...par fenêtre de temps

const pixelRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS, // Limite chaque IP à 1 requête par 'windowMs'
  
  message: {
    message: `Vous ne pouvez placer qu'un pixel toutes les ${PIXEL_COOLDOWN_MINUTES} minute(s).`
  },
  
  // (Recommandé) Gère les en-têtes pour informer le client
  headers: true, 
  // (Recommandé) Ne pas utiliser 'req.ip' si vous êtes derrière un proxy
  // trustProxy: 1, 
});

module.exports = pixelRateLimiter;