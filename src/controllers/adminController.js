// src/controllers/adminController.js
const adminService = require('../services/adminService');

/*
 * (US-8) Contrôleur pour réinitialiser la grille
 */
exports.resetGrid = async (req, res) => {
  try {
    const result = await adminService.resetGrid();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};