// src/routes/gridRoutes.js
const express = require('express');
const router = express.Router();
const gridController = require('../controllers/gridController');

// US-4: Récupérer l'état actuel de la grille (Route publique)
router.get('/', gridController.getGridState);

// US-5: Placer un pixel (Route privée)
// TODO: Ajouter les middlewares (checkJwt, rateLimiter) ici plus tard
router.post('/pixel', gridController.placePixel);

module.exports = router;

