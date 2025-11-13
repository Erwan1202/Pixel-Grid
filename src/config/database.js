// Fichier: src/config/database.js

require('dotenv').config();
const { Pool } = require('pg');
const mongoose = require('mongoose');

const pgConfig = {
  user: process.env.DB_PG_USER,
  password: process.env.DB_PG_PASSWORD,
  host: process.env.DB_PG_HOST,
  port: process.env.DB_PG_PORT,
  database: process.env.DB_PG_DATABASE,
};

const pool = new Pool(pgConfig);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL', err.stack);
  } else {
    console.log('Connexion à PostgreSQL réussie:', res.rows[0].now);
  }
});

const mongoURI = process.env.DB_MONGO_URI;

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connexion à MongoDB réussie.');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB', err.message);
    process.exit(1);
  }
};

module.exports = {
  pgPool: pool,
  connectMongo,
};