"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            description: "This is a simple CRUD API for managing tasks.",
            contact: {
                name: "Hrutvik Malshikare",
                url: "https://github.com/Hrutvik66",
            },
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server",
            },
        ],
    },
    // looks for configuration in specified directories
    apis: ["./build/routes/*.js"],
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
/**
 * Configures swagger docs for the given express app.
 *
 * @param {import('express').Express} app - The express app to configure.
 * @param {number} port - The port number the app is running on.
 */
var swaggerDocs = function (app, port) {
    // Swagger Page
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Documentation in JSON format
    app.get("/docs.json", function (req, res) {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};
exports.default = swaggerDocs;
