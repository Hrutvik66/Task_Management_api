import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
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
      {
        url: "https://task-management-api-fzhd.onrender.com/",
        description: "Production server",
      }
    ],
  },
  // looks for configuration in specified directories
  apis: ["./build/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
/**
 * Configures swagger docs for the given express app.
 *
 * @param {import('express').Express} app - The express app to configure.
 * @param {number} port - The port number the app is running on.
 */
const swaggerDocs = (app: import("express").Express, port: number): void => {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get(
    "/docs.json",
    (req: import("express").Request, res: import("express").Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    }
  );
};
export default swaggerDocs;
