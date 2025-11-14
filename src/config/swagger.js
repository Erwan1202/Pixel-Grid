const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PixelGrid API",
            version: "1.0.0",
            description: "API documentation for the Grid-Pixel r/place clone.",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: "Local development server",
            },
        ],
    },
    apis: [path.join(process.cwd(), "src/routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
