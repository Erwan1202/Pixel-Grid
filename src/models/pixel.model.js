const pool = require("../config/db.postgres");

class Pixel {
    static async findAll() {
        const result = await pool.query("SELECT * FROM pixels");
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query("SELECT * FROM pixels WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
    }

    static async createOne({ x, y, color, user_id }) {
        const result = await pool.query(
            "INSERT INTO pixels (x, y, color, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [x, y, color, user_id]
        );
        return result.rows[0];
    }

    static async updateOne(id, { x, y, color, user_id }) {
        const result = await pool.query(
            "UPDATE pixels SET x = $1, y = $2, color = $3, user_id = $4 WHERE id = $5 RETURNING *",
            [x, y, color, user_id, id]
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
