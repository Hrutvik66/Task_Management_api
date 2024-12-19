import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const Database_URL: string = process.env.DB_URL!!;
const sequelize = new Sequelize(Database_URL, {
  logging: false,
  dialect: "postgres",
});

export default sequelize;
