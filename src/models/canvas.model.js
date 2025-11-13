const pool = require("../config/db.postgres");

class Canvas {
    static async findAll() {
        const result = await pool.query("SELECT * FROM canvases");
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(
            "SELECT * FROM canvases WHERE id = $1",
            [id]
        );
        return result.rows[0];
    }

    static async createOne({ name, width, height }) {
        const result = await pool.query(
            "INSERT INTO canvases (name, width, height) VALUES ($1, $2, $3) RETURNING *",
            [name, width, height]
        );
        return result.rows[0];
    }

    static async updateOne(id, { name, width, height }) {
        const result = await pool.query(
            "UPDATE canvases SET name = $1, width = $2, height = $3 WHERE id = $4 RETURNING *",
            [name, width, height, id]
        );
        return result.rows[0];
    }

    static async deleteOne(id) {
        const result = await pool.query(
            "DELETE FROM canvases WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rowCount;
    }
}

module.exports = Canvas;
