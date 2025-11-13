// src/server.js

const express = require('express');
const cors = require('cors');
const { connectMongo } = require('./config/database');

// --- Import des Routes ---
const gridRoutes = require('./routes/gridRoutes');
const adminRoutes = require('./routes/adminRoutes'); 

// --- Import Swagger ---
const setupSwagger = require('./config/swagger');

require('dotenv').config();

const app = express();

// --- Connexion BDD ---
connectMongo();

// --- Middlewares Globaux ---
app.use(cors());
app.use(express.json()); 

// --- Documentation Swagger ---
setupSwagger(app);

// --- Routes ---
app.get('/', (req, res) => {
  res.send('API PixelGrid est en cours de fonctionnement !');
});

// On branche les routes de la grille
app.use('/api/grid', gridRoutes); 


// on branche les routes admin
app.use('/api/admin', adminRoutes);

// --- Démarrage Serveur ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré et à l'écoute sur le port ${PORT}`);
});