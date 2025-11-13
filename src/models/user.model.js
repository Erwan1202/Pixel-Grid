const bcrypt = require("bcrypt");
const pool = require("../config/db.postgres");

class User {
    static async findAll() {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    }

    static async findByUsername(username) {
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
    }

    static async createOne({ username, password, age }) {
        const nHash = Number(process.env.BCRYPT_SALT_ROUNDS);
        const hashed = await bcrypt.hash(password, nHash);

        const result = await pool.query(
            "INSERT INTO users (username, password, age) VALUES ($1, $2, $3) RETURNING *",
            [username, hashed, age]
        );
        return result.rows[0];
    }

    static async updateOne(id, { username, password, age, is_banned }) {
        const nHash = Number(process.env.BCRYPT_SALT_ROUNDS);
        const hashed = await bcrypt.hash(password, nHash);

        const result = await pool.query(
            "UPDATE users SET username = $1, password = $2, age = $3, is_banned = $4 WHERE id = $5 RETURNING *",
            [username, hashed, age, is_banned, id]
        );
        return result.rows[0];
    }

    static async deleteOne(id) {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rowCount;
    }
}

module.exports = User;
