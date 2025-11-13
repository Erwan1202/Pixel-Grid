const express = require('express');
const cors = require('cors');

const { connectMongo } = require('./config/database');


require('dotenv').config();


const app = express();

connectMongo();

app.use(cors());

app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré et à l'écoute sur le port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API PixelWar est en cours de fonctionnement !');
});