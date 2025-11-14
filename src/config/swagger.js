const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "PixelGrid API",
        version: "1.0.0",
        description: "API documentation for the Grid-Pixel r/place clone.",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: "Serveur de développement local",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [path.join(process.cwd(), "src/routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(
        `Swagger documentation available at http://localhost:${
            process.env.PORT || 3000
        }/api-docs`
    );
};

module.exports = setupSwagger;
