import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/node-api',{
    logging: false,
    dialect: 'postgres',
})

export default sequelize;