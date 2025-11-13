const express = require('express');
const router = express.Router();
const gridController = require('../controllers/gridController');
const pixelRateLimiter = require('../middlewares/rateLimiter');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pixel:
 *       type: object
 *       properties:
 *         x:
 *           type: integer
 *           description: Coordonnée X du pixel.
 *         y:
 *           type: integer
 *           description: Coordonnée Y du pixel.
 *         color:
 *           type: string
 *           description: Couleur hexadécimale (ex: "#FFFFFF").
 *       example:
 *         x: 10
 *         y: 10
 *         color: "#FF0000"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message d'erreur.
 */
/**
 * @swagger
 * tags:
 *   - name: Grid
 *     description: Gestion de la grille et des pixels
 */
/**
 * @swagger
 * /api/grid:
 *   get:
 *     summary: Recupere l'etat actuel de la grille
 *     tags:
 *       - Grid
 *     description: Retourne un tableau de tous les pixels.
 *     responses:
 *       200:
 *         description: Un tableau de pixels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pixel'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', gridController.getGridState);

/**
 * @swagger
 * /api/grid/pixel:
 *   post:
 *     summary: Place un pixel sur la grille
 *     tags:
 *       - Grid
 *     description: Permet a un utilisateur de placer un pixel.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - x
 *               - y
 *               - color
 *             properties:
 *               x:
 *                 type: integer
 *               y:
 *                 type: integer
 *               color:
 *                 type: string
 *             example:
 *               x: 10
 *               y: 10
 *               color: "#FF0000"
 *     responses:
 *       201:
 *         description: Pixel place avec succes.
 *       400:
 *         description: Donnees manquantes.
 *       429:
 *         description: Rate limit atteint.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/pixel', pixelRateLimiter, gridController.placePixel);

module.exports = router;