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
// tasks service
var task_service_1 = __importDefault(require("../services/task.service"));
// custom error
var CustomError_1 = __importDefault(require("../lib/CustomError"));
var createTask = task_service_1.default.createTask, getAllTasks = task_service_1.default.getAllTasks, getTaskById = task_service_1.default.getTaskById, updateTask = task_service_1.default.updateTask, deleteTask = task_service_1.default.deleteTask;
var TaskController = /** @class */ (function () {
    function TaskController() {
        var _this = this;
        this.createTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, title, description, id, task, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, description = _a.description;
                        id = 0;
                        if (req.token) {
                            id = req.token.id;
                        }
                        return [4 /*yield*/, createTask(title, description, id)];
                    case 1:
                        task = _b.sent();
                        res.status(201).json(task);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error("Failed to create task:", error_1);
                        if (error_1 instanceof CustomError_1.default) {
                            res.status(error_1.statusCode).json({ message: error_1.message });
                        }
                        else {
                            res.status(500).json({ message: "Internal Server Error" });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAllTasks = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tasks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, getAllTasks()];
                    case 1:
                        tasks = _a.sent();
                        res.status(200).json(tasks);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Failed to get all tasks:", error_2);
                        if (error_2 instanceof CustomError_1.default) {
                            res.status(error_2.statusCode).json({ message: error_2.message });
                        }
                        else {
                            res.status(500).json({ message: "Internal Server Error" });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getTaskById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var taskId, task, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        taskId = parseInt(req.params.id);
                        if (isNaN(taskId)) {
                            throw new CustomError_1.default("Task id must be a number", 400);
                        }
                        return [4 /*yield*/, getTaskById(taskId)];
                    case 1:
                        task = _a.sent();
                        res.status(200).json(task);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Failed to get task by id:", error_3);
                        if (error_3 instanceof CustomError_1.default) {
                            res.status(error_3.statusCode).json({ message: error_3.message });
                        }
                        else {
                            res.status(500).json({ error: "Internal Server Error" });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var taskId, _a, title, description, status, updatedRows, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        taskId = parseInt(req.params.id);
                        if (isNaN(taskId)) {
                            throw new CustomError_1.default("Task id must be a number", 400);
                        }
                        _a = req.body, title = _a.title, description = _a.description, status = _a.status;
                        return [4 /*yield*/, updateTask(taskId, title, description, status)];
                    case 1:
                        updatedRows = _b.sent();
                        res.status(200).json(updatedRows);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error("Failed to update task:", error_4);
                        if (error_4 instanceof CustomError_1.default) {
                            res.status(error_4.statusCode).json({ message: error_4.message });
                        }
                        else {
                            res.status(500).json({ error: "Internal Server Error" });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteTask = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var taskId, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        taskId = parseInt(req.params.id);
                        if (isNaN(taskId)) {
                            throw new CustomError_1.default("Task id must be a number", 400);
                        }
                        return [4 /*yield*/, deleteTask(taskId)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "Task deleted successfully" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        if (error_5 instanceof CustomError_1.default) {
                            res.status(error_5.statusCode).json({ message: error_5.message });
                        }
                        else {
                            console.error("Failed to delete task:", error_5);
                            res.status(500).json({ error: "Internal Server Error" });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return TaskController;
}());
exports.default = new TaskController();