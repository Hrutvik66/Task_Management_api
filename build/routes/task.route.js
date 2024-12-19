"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// controllers
var task_controller_1 = __importDefault(require("../controllers/task.controller"));
var auth_middleware_1 = require("../middleware/auth.middleware");
var createTask = task_controller_1.default.createTask, getAllTasks = task_controller_1.default.getAllTasks, getTaskById = task_controller_1.default.getTaskById, updateTask = task_controller_1.default.updateTask, deleteTask = task_controller_1.default.deleteTask;
var taskRouter = (0, express_1.Router)();
/**
 * @openapi
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */
taskRouter.post("/", auth_middleware_1.auth, createTask);
/**
 * @openapi
 * /api/task/:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error
 */
taskRouter.get("/", getAllTasks);
/**
 * @openapi
 * /api/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
taskRouter.get("/:id", getTaskById);
/**
 * @openapi
 * /api/task/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
taskRouter.put("/:id", auth_middleware_1.auth, updateTask);
/**
 * @openapi
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
taskRouter.delete("/:id", auth_middleware_1.auth, deleteTask);
exports.default = taskRouter;
