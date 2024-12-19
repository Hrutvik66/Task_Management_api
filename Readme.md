# Task Management API

A robust task management API built with Node.js, Express.js, TypeScript, Sequelize, and PostgreSQL. This API provides features for user authentication and CRUD operations for managing tasks efficiently.

---

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Task Management**: Create, read, update, and delete tasks.
- **API Documentation**: Integrated Swagger documentation for easy API usage.
- **Database Integration**: PostgreSQL database with Sequelize ORM.
- **Type Safety**: Developed using TypeScript for enhanced code quality and maintainability.

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)
- [npm](https://www.npmjs.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Hrutvik66/Task_Management_api.git
   cd Task_Management_api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   DEVELOPMENT_DB_URL=postgres://username:password@localhost:5432/task_management_db
   SECRET_KEY=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

---

## API Documentation

Swagger is integrated for API documentation. Once the server is running, access the Swagger UI at:
```
http://localhost:3000/docs
```

---

## Directory Structure

```
.
├── controllers
│   ├── task.controller.ts
│   └── user.controller.ts
├── database
│   └── database.ts
├── dtos
│   ├── task.dto.ts
│   └── user.dto.ts
├── index.ts
├── lib
│   └── CustomError.ts
├── middleware
│   └── auth.middleware.ts
├── models
│   ├── models.ts
│   ├── task.ts
│   └── user.ts
├── routes
│   ├── task.route.ts
│   └── user.route.ts
├── services
│   ├── task.service.ts
│   └── user.service.ts
├── swagger.ts
└── types
    └── types.d.ts
```

---

## Scripts

- **Start Development Server**:
  ```bash
  npm run start:dev
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Start Production Server**:
  ```bash
  npm run start
  ```

- **Lint Code**:
  ```bash
  npm run lint
  ```

---

## Swagger Documentation Configuration

Swagger documentation is available at `/docs` when the server is running. The configuration is set up to work in both development and production environments. Below is the Swagger configuration used:

```typescript
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
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
```

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: Swagger

## Contact

For any feedback, please contact:
- **Email**: hrutvikmalshikare66@gmail.com
- **GitHub**: [Hrutvik66](https://github.com/Hrutvik66)

