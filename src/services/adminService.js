// src/services/adminService.js
const { pgPool } = require('../config/database');
const Pixel = require('../models/Pixel'); // On importe le modèle Pixel

/*
 * Service pour réinitialiser la grille.
 * Cela vide la table 'pixel' (PostgreSQL).
 */
async function resetGrid() {
  try {
    // Exécute une commande SQL TRUNCATE pour vider la table rapidement
    await pgPool.query('TRUNCATE TABLE pixel');
    return { message: "La grille a été réinitialisée avec succès." };
  } catch (error) {
    console.error("Erreur lors du TRUNCATE de la table pixel:", error);
    throw new Error("Erreur lors de la réinitialisation de la grille.");
  }
}

/* NOTE (US-8): Le cooldown du rate limiter est chargé au démarrage par
 * express-rate-limit. Pour pouvoir le changer sans redémarrer,
 * stockez la valeur en variable d'environnement (ex: PIXEL_COOLDOWN)
 * ou en base et relisez-la (avec cache) dans le middleware.
 */

module.exports = {
  resetGrid,
};