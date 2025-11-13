const gridService = require('../services/gridService');

exports.getGridState = async (req, res) => {
  try {
    const grid = await gridService.getGridState();
    res.status(200).json(grid);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la grille.", error: error.message });
  }
};

exports.placePixel = async (req, res) => {
  try {
    const { x, y, color } = req.body;
    const userId = 'temp_user_id_for_testing';

    if (x === undefined || y === undefined || !color) {
      return res.status(400).json({ message: "Coordonnées (x, y) et couleur requises." });
    }

    const newPixel = await gridService.placePixel(x, y, color, userId);

    const io = req.app.get('io');
    io.emit('new_pixel', newPixel);

    res.status(201).json({ message: "Pixel placé avec succès.", pixel: newPixel });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors du placement du pixel.", error: error.message });
  }
};