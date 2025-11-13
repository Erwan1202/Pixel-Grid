const pool = require("../config/db.postgres");

class Pixel {
    static async findAll() {
        const result = await pool.query("SELECT * FROM pixels");
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(
            "SELECT * FROM pixels WHERE id = $1",
            [id]
        );
        return result.rows[0];
    }

    static async createOne({ x, y, color, placed_by, canvas_id }) {
        const result = await pool.query(
            "INSERT INTO pixels (x, y, color, placed_by, canvas_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [x, y, color, placed_by, canvas_id]
        );
        return result.rows[0];
    }

    static async updateOne(id, { x, y, color, placed_by, canvas_id }) {
        const result = await pool.query(
            "UPDATE pixels SET x = $1, y = $2, color = $3, placed_by = $4, canvas_id = $5 WHERE id = $6 RETURNING *",
            [x, y, color, placed_by, canvas_id, id]
        );
        return result.rows[0];
    }

    static async deleteOne(id) {
        const result = await pool.query(
            "DELETE FROM pixels WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rowCount;
    }
}

module.exports = Pixel;
