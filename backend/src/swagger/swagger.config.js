import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { getEnv } from "../utils/env.js";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options =  {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Cosmo-Connect API Documentation",
            version: "1.0.0",
            description: "API documentation for Cosmo-Connect application",
        },
        servers: [
            {
                url: `http://localhost:${getEnv("PORT") || 5080}/api`,
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        join(dirname(__dirname), "routes/*.js")
    ],
};

const specs = swaggerJsdoc(options);
const swaggerDocs = (app) => {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.get("/docs.json", (req, res) => {
        console.log("Swagger is up and running");
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });
};

export default swaggerDocs;