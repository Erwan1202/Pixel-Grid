// src/services/gridService.js
const Pixel = require('../models/Pixel');
const PixelLog = require('../models/PixelLog');

/**
 * Service pour récupérer l'état complet de la grille.
 */
async function getGridState() {
  // Appelle le modèle Pixel (PostgreSQL)
  return Pixel.getAll();
}

/**
 * Service pour placer un pixel.
 */
async function placePixel(x, y, color, userId) {
  // Enregistrer dans l'historique (MongoDB)
  const logEntry = new PixelLog({ x, y, color, user_id: userId });
  await logEntry.save();

  // Mettre à jour l'état actuel (PostgreSQL)
  // Le modèle Pixel gère l'UPSERT (création ou mise à jour)
  await Pixel.place(x, y, color, userId);

  return { x, y, color };
}

module.exports = {
  getGridState,
  placePixel,
};