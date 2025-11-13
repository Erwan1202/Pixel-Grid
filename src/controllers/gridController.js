// src/controllers/gridController.js
const gridService = require('../services/gridService');

/*
 * US-4: Récupérer l'état de la grille
 */
exports.getGridState = async (req, res) => {
  try {
    const grid = await gridService.getGridState();
    res.status(200).json(grid);
  } catch (error) {
    console.error('Erreur dans getGridState:', error.message);
    res.status(500).json({ message: "Erreur lors de la récupération de la grille.", error: error.message });
  }
};

/*
 * US-5: Placer un pixel
 */
exports.placePixel = async (req, res) => {
  try {
    // On récupère les données du corps de la requête (body)
    const { x, y, color } = req.body;

    // TODO: Remplacer 'temp_user_id' par le vrai ID de l'utilisateur
    // qui sera fourni par le middleware checkJwt (de DEV A)
    // Pour l'instant, on met une valeur en dur pour tester.
    const userId = 'temp_user_id_for_testing'; // req.user.id viendra plus tard

    if (x === undefined || y === undefined || !color) {
      return res.status(400).json({ message: "Coordonnées (x, y) et couleur requises." });
    }

    const newPixel = await gridService.placePixel(x, y, color, userId);
    
    // On envoie une confirmation
    res.status(201).json({ message: "Pixel placé avec succès.", pixel: newPixel });

  } catch (error) {
    console.error('Erreur dans placePixel:', error.message);
    res.status(500).json({ message: "Erreur lors du placement du pixel.", error: error.message });
  }
};