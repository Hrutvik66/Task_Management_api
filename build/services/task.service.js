"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tasks model
var models_1 = require("../models/models");
// Custom error class
var CustomError_1 = __importDefault(require("../lib/CustomError"));
var TaskService = /** @class */ (function () {
    function TaskService() {
    }
    /**
     * Creates a new task.
     * @param title the title of the task
     * @param description the description of the task
     * @returns the created task
     * @throws {Error} if an error occurs while creating the task
     */
    TaskService.prototype.createTask = function (title, description, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var task, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!title || !description) {
                            throw new CustomError_1.default("Title and description are required", 400);
                        }
                        return [4 /*yield*/, models_1.Task.create({ title: title, description: description, userId: userId })];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof CustomError_1.default) {
                            throw error_1;
                        }
                        console.error("Failed to create task:", error_1);
                        throw new CustomError_1.default("Failed to get all tasks", 500);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves all tasks.
     * @returns all tasks
     * @throws {Error} if an error occurs while retrieving all tasks
     */
    TaskService.prototype.getAllTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tasks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.Task.findAll({ limit: 10 })];
                    case 1:
                        tasks = _a.sent();
                        if (!tasks) {
                            throw new CustomError_1.default("No tasks found", 404);
                        }
                        return [2 /*return*/, tasks];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2 instanceof CustomError_1.default) {
                            throw error_2;
                        }
                        console.error("Failed to get all tasks:", error_2);
                        throw new CustomError_1.default("Failed to get all tasks", 500);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a task by its id.
     * @param taskId the id of the task to retrieve
     * @returns the task with the given id
     * @throws {Error} if the task with the given id does not exist
     */
    TaskService.prototype.getTaskById = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var task, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (taskId === null || taskId === undefined) {
                            throw new CustomError_1.default("Task ID is required", 400);
                        }
                        return [4 /*yield*/, models_1.Task.findByPk(taskId)];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            throw new CustomError_1.default("Task not found", 404);
                        }
                        return [2 /*return*/, task];
                    case 2:
                        error_3 = _a.sent();
                        if (error_3 instanceof Error) {
                            throw error_3;
                        }
                        console.error("Failed to get task by id:", error_3);
                        throw new CustomError_1.default("Failed to get task by id", 500);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates a task with the given id.
     * @param taskId the id of the task to update
     * @param title the new title of the task
     * @param description the new description of the task
     * @param status the new status of the task
     * @returns the updated task
     */
    TaskService.prototype.updateTask = function (taskId, title, description, status) {
        return __awaiter(this, void 0, void 0, function () {
            var taskRecord, task, updatedTask, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (taskId === null || taskId === undefined) {
                            throw new CustomError_1.default("Task ID is required", 400);
                        }
                        return [4 /*yield*/, models_1.Task.findByPk(taskId)];
                    case 1:
                        taskRecord = _a.sent();
                        if (!taskRecord) {
                            throw new CustomError_1.default("Task not found", 404);
                        }
                        task = taskRecord.toJSON();
                        return [4 /*yield*/, models_1.Task.update({
                                title: title !== null && title !== void 0 ? title : task.title,
                                description: description !== null && description !== void 0 ? description : task.description,
                                status: status !== null && status !== void 0 ? status : task.status,
                            }, {
                                where: {
                                    id: taskId,
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, models_1.Task.findByPk(taskId)];
                    case 3:
                        updatedTask = _a.sent();
                        if (!updatedTask) {
                            throw new CustomError_1.default("Failed to retrieve updated task", 500);
                        }
                        return [2 /*return*/, updatedTask];
                    case 4:
                        error_4 = _a.sent();
                        console.error("Failed to update task:", error_4);
                        throw error_4 instanceof CustomError_1.default
                            ? error_4
                            : new Error("An unexpected error occurred");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deletes a task with the given id.
     * @param taskId the id of the task to delete
     * @returns the number of rows affected
     */
    TaskService.prototype.deleteTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedRows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (taskId === null || taskId === undefined) {
                            throw new CustomError_1.default("Task ID is required", 400);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.Task.destroy({
                                where: {
                                    id: taskId,
                                },
                            })];
                    case 2:
                        deletedRows = _a.sent();
                        if (deletedRows === 0) {
                            throw new CustomError_1.default("Task with ID ".concat(taskId, " not found"), 404);
                        }
                        return [2 /*return*/, deletedRows];
                    case 3:
                        error_5 = _a.sent();
                        console.error("Failed to delete task:", error_5);
                        throw error_5 instanceof CustomError_1.default
                            ? error_5
                            : new Error("An unexpected error occurred");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TaskService;
}());
exports.default = new TaskService();
