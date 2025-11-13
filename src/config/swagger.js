// src/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PixelGrid API',
    version: '1.0.0',
    description: 'Documentation de l\'API RESTful pour le projet PixelGrid (r/place clone)',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Serveur de développement local',
    },
  ],
};

// Options pour swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: [path.join(process.cwd(), 'src/routes/*.js')], 
};

// Initialise swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Fonction pour configurer Swagger UI dans notre app Express
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Documentation Swagger disponible sur http://localhost:${process.env.PORT || 3000}/api-docs`);
};

module.exports = setupSwagger;