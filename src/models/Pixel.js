const { pgPool } = require('../config/database');

const Pixel = {
  async getAll() {
    const result = await pgPool.query(
      'SELECT x_coord, y_coord, color FROM pixel'
    );
    return result.rows;
  },

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