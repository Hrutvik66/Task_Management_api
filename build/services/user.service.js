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
// user model
var models_1 = require("../models/models");
// custom error
var CustomError_1 = __importDefault(require("../lib/CustomError"));
var models_2 = require("../models/models");
var UserServices = /** @class */ (function () {
    function UserServices() {
    }
    /**
     * Retrieves all users.
     * @returns an array of user objects
     * @throws {Error} if an error occurs while retrieving all users
     */
    UserServices.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.User.findAll({
                                include: [
                                    {
                                        model: models_2.Task,
                                        as: "tasks",
                                    },
                                ],
                            })];
                    case 1:
                        users = _a.sent();
                        if (!users.length) {
                            throw new CustomError_1.default("No users found", 404);
                        }
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof CustomError_1.default) {
                            throw error_1;
                        }
                        else {
                            console.error("Failed to get all users:", error_1);
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a user by its id.
     * @param userId the id of the user to retrieve
     * @returns the user with the given id or null if the user does not exist
     * @throws {Error} if an error occurs while retrieving the user
     */
    UserServices.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.User.findByPk(userId, { include: ["tasks"] })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new CustomError_1.default("User not found", 404);
                        }
                        return [2 /*return*/, user.toJSON()];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2 instanceof CustomError_1.default) {
                            throw error_2;
                        }
                        else {
                            console.error("Failed to get user by id:", error_2);
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a user by its email.
     * @param email the email of the user to retrieve
     * @returns the user with the given email or null if the user does not exist
     * @throws {Error} if an error occurs while retrieving the user
     */
    UserServices.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.User.findOne({ where: { email: email }, include: ["tasks"] })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Failed to get user by email:", error_3);
                        if (error_3 instanceof CustomError_1.default) {
                            throw error_3;
                        }
                        else {
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves a user by its username.
     * @param username - The username of the user to retrieve.
     * @returns The user with the given username or null if the user does not exist.
     * @throws {Error} If an error occurs while retrieving the user.
     */
    UserServices.prototype.getUserByUserName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username) {
                            throw new Error("Username is required");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.User.findOne({
                                where: { username: username },
                                include: ["tasks"],
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Failed to get user by username:", error_4);
                        if (error_4 instanceof CustomError_1.default) {
                            throw error_4;
                        }
                        else {
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a new user with the given username, email, and password.
     * @param username - The username of the user to create.
     * @param email - The email address of the user to create.
     * @param password - The password of the user to create.
     * @returns A promise that resolves to a UserDto object representing the created user.
     * @throws {Error} If the username, email, or password is not provided or if an error occurs while creating the user.
     */
    UserServices.prototype.createUser = function (username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userJson, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username) {
                            throw new CustomError_1.default("Username is required", 400);
                        }
                        if (!email) {
                            throw new CustomError_1.default("Email is required", 400);
                        }
                        if (!password) {
                            throw new CustomError_1.default("Password is required", 400);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.User.create({ username: username, email: email, password: password })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new CustomError_1.default("Failed to create user", 500);
                        }
                        userJson = user.toJSON();
                        return [2 /*return*/, userJson];
                    case 3:
                        error_5 = _a.sent();
                        if (error_5 instanceof CustomError_1.default) {
                            throw error_5;
                        }
                        else {
                            console.error("Failed to create user:", error_5);
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates a user with the given id.
     * @param userId - The id of the user to update.
     * @param username - The new username of the user.
     * @param email - The new email of the user.
     * @param password - The new password of the user.
     * @returns A promise that resolves to true if the user is successfully updated.
     * @throws {Error} If the user ID, username, email, or password is not provided or if an error occurs while updating the user.
     */
    UserServices.prototype.updateUser = function (userId, username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedRows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userId || !username || !email || !password) {
                            throw new CustomError_1.default("User ID, username, email, and password are required", 400);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.User.update({ username: username, email: email, password: password }, { where: { id: userId } })];
                    case 2:
                        updatedRows = (_a.sent())[0];
                        if (updatedRows === 0) {
                            throw new CustomError_1.default("User with ID ".concat(userId, " not found"), 404);
                        }
                        return [2 /*return*/, true];
                    case 3:
                        error_6 = _a.sent();
                        if (error_6 instanceof Error) {
                            console.error("Failed to update user:", error_6);
                            throw error_6;
                        }
                        else {
                            console.error("Failed to update user:", error_6);
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deletes a user with the given id.
     * @param userId - The id of the user to delete.
     * @returns The number of rows affected.
     * @throws {Error} If the user ID is not provided or if an error occurs while deleting the user.
     */
    UserServices.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedRows, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (userId === null || userId === undefined) {
                            throw new CustomError_1.default("User ID is required", 400);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.User.destroy({ where: { id: userId } })];
                    case 2:
                        deletedRows = _a.sent();
                        if (deletedRows === 0) {
                            throw new CustomError_1.default("User with ID ".concat(userId, " not found"), 404);
                        }
                        return [2 /*return*/, deletedRows];
                    case 3:
                        error_7 = _a.sent();
                        if (error_7 instanceof Error) {
                            console.error("Failed to delete user:", error_7);
                            throw error_7;
                        }
                        else {
                            console.error("Failed to delete user:", error_7);
                            throw new Error("An unexpected error occurred");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserServices;
}());
exports.default = new UserServices();
