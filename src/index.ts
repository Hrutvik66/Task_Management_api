import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import sequelize from "./database/database";
import swaggerDocs from "./swagger";
import userRouter from "./routes/user.route";
import taskRouter from "./routes/task.route";
import cors from "cors";

const port = 3000;
// express application
const app = express();
// cors
app.use(cors());

// sequelize database connection checking functions
const sequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

// creating tables
const createTables = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to sync models with the database:", error);
    throw error;
  }
};

//? Middlewares
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//? Swagger docs
swaggerDocs(app, port);

//? api routes
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

//? Starting the server
const server = http.createServer(app);

// Connect to the database and start the server
const startServer = async () => {
  try {
    await sequelizeConnection();
    await createTables();
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
