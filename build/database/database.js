"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('postgres://postgres:postgres@localhost:5432/node-api', {
    logging: false,
    dialect: 'postgres',
});
exports.default = sequelize;
