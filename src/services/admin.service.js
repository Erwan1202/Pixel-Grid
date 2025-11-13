const pool = require("../config/db.postgres");
const Pixel = require("../models/pixel.model");

async function resetGrid() {
    try {
        await pool.query("TRUNCATE TABLE pixel");
        return { message: "La grille a été réinitialisée avec succès." };
    } catch (error) {
        console.error("Erreur lors du TRUNCATE de la table pixel:", error);
        throw new Error("Erreur lors de la réinitialisation de la grille.");
    }
}

module.exports = resetGrid;
