const { pgPool } = require('../config/database');
const Pixel = require('../models/Pixel');

async function resetGrid() {
  try {
    await pgPool.query('TRUNCATE TABLE pixel');
    return { message: "La grille a été réinitialisée avec succès." };
  } catch (error) {
    console.error("Erreur lors du TRUNCATE de la table pixel:", error);
    throw new Error("Erreur lors de la réinitialisation de la grille.");
  }
}

module.exports = {
  resetGrid,
};