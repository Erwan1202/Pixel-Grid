// src/models/Pixel.js
const { pgPool } = require('../config/database');

const Pixel = {
  /**
   * Récupère tous les pixels (état actuel de la grille)
   */
  async getAll() {
    const result = await pgPool.query(
      'SELECT x_coord, y_coord, color FROM pixel'
    );
    return result.rows;
  },

  /**
   * Place ou met à jour un pixel (logique "UPSERT").
   * Si le pixel (x, y) existe, il est mis à jour.
   * Sinon, il est créé.
   */
  async place(x, y, color, userId) {
    const query = `
      INSERT INTO pixel (x_coord, y_coord, color, user_id, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      ON CONFLICT (x_coord, y_coord) 
      DO UPDATE SET
        color = EXCLUDED.color,
        user_id = EXCLUDED.user_id,
        updated_at = CURRENT_TIMESTAMP;
    `;
    await pgPool.query(query, [x, y, color, userId]);
  }
};

module.exports = Pixel;