"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.User = void 0;
var user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
var task_1 = __importDefault(require("./task"));
exports.Task = task_1.default;
// Define associations
user_1.default.hasMany(task_1.default, {
    foreignKey: 'userId',
    as: 'tasks',
});
task_1.default.belongsTo(user_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
