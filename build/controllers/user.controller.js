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
// jwt
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// bcrypt
var bcrypt_1 = __importDefault(require("bcrypt"));
// user services
var user_service_1 = __importDefault(require("../services/user.service"));
// dotenv
var dotenv_1 = __importDefault(require("dotenv"));
var CustomError_1 = __importDefault(require("../lib/CustomError"));
dotenv_1.default.config({});
var getAllUsers = user_service_1.default.getAllUsers, getUserByUserName = user_service_1.default.getUserByUserName, getUserByEmail = user_service_1.default.getUserByEmail, createUser = user_service_1.default.createUser;
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, getAllUsers()];
                    case 1:
                        users = _a.sent();
                        res.status(200).json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Failed to get all users:", error_1);
                        if (error_1 instanceof Error) {
                            res.status(500).json({ error: error_1.message });
                        }
                        else {
                            res.status(500).json({ error: "An unexpected error occurred" });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //   Register user
    UserController.prototype.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, email, password, existingUser, existingUserName, hashedPassword, user, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                        return [4 /*yield*/, getUserByEmail(email)];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser) {
                            throw new CustomError_1.default("User already exists", 400);
                        }
                        return [4 /*yield*/, getUserByUserName(username)];
                    case 2:
                        existingUserName = _b.sent();
                        if (existingUserName) {
                            throw new CustomError_1.default("Username should be unique", 400);
                        }
                        //hash password
                        if (!password) {
                            throw new CustomError_1.default("Password is required", 400);
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 3:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, createUser(username, email, hashedPassword)];
                    case 4:
                        user = _b.sent();
                        res.status(201).json(user);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        console.error("Failed to register user:", error_2);
                        if (error_2 instanceof CustomError_1.default) {
                            res.status(error_2.statusCode).json({ error: error_2.message });
                        }
                        else {
                            res.status(500).json({ error: "An unexpected error occurred" });
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //   Login user
    UserController.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, isMatch, SECRET_KEY, token, error_3;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, getUserByEmail(email)];
                    case 1:
                        user = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.toJSON();
                        if (!user) {
                            throw new CustomError_1.default("User not found", 404);
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isMatch = _c.sent();
                        if (!isMatch) {
                            throw new CustomError_1.default("Incorrect password", 401);
                        }
                        SECRET_KEY = process.env.SECRET_KEY;
                        token = jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
                        res.status(200).json({ user: user, token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        console.error("Failed to login user:", error_3);
                        if (error_3 instanceof CustomError_1.default) {
                            res.status(error_3.statusCode || 500).json({ error: error_3.message });
                        }
                        else {
                            res.status(500).json({ error: "An unexpected error occurred" });
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
