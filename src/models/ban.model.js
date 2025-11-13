const pool = require("../config/db.postgres");

class Ban {
    static async findAll() {
        const result = await pool.query("SELECT * FROM bans");
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(
            "SELECT * FORM bans WHERE id = $1",
            [id]
        );
        return result.rows[0];
    }

    static async createOne({ reason, user_id, expires_at }) {
        const result = await pool.query(
            "INSERT INTO bans (reason, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *",
            [reason, user_id, expires_at]
        );
        return result.rows[0];
    }

    static async updateOne(id, { reason, user_id, expires_at }) {
        const result = await pool.query(
            "UPDATE bans SET reason = $1, user_id = $2, expires_at = $3 WHERE id = $4 RETURNING *",
            [reason, user_id, expires_at, id]
        );
        return result.rows[0];
    }

    static async deleteOne(id) {
        const result = await pool.query(
            "DELETE FROM bans WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rowCount;
    }
}

module.exports = Ban;
