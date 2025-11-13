require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_PG_HOST,
    user: process.env.DB_PG_USER,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_DATABASE,
    port: process.env.DB_PG_PORT,
});

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Erreur de connexion à PostgreSQL", err.stack);
    } else {
        console.log("Connexion à PostgreSQL réussie:", res.rows[0].now);
    }
});

module.exports = pool;
