const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

/**
 * @swagger
 * tags:
 * - name: Admin
 *   description: Actions reservees aux administrateurs
 */
/**
 * @swagger
 * /api/admin/reset-grid:
 *   post:
 *     summary: Reinitialise la grille
 *     tags:
 *       - Admin
 *     description: (Admin) Vide completement la table des pixels (PostgreSQL).
 *     responses:
 *       200:
 *         description: Grille reinitialisee avec succes.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/reset-grid", adminController.resetGrid);

module.exports = router;
