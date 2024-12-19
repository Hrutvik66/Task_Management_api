import { Router } from "express";
// controllers
import userController from "../controllers/user.controller";

const { getAllUsers, registerUser, loginUser } = userController;

const userRouter = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   description: The user's username
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: johndoe@example.com
 *       400:
 *         description: Invalid input or user already exists
 */
userRouter.post("/register", registerUser);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The logged-in user's details
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID
 *                       example: 12345
 *                     username:
 *                       type: string
 *                       description: The user's username
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                       example: johndoe@example.com
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */
userRouter.post("/login", loginUser);

/**
 * @openapi
 * /api/auth/:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID
 *                     example: 12345
 *                   username:
 *                     type: string
 *                     description: The user's username
 *                     example: johndoe
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                     example: johndoe@example.com
 *       500:
 *         description: Internal server error
 */
userRouter.get("/", getAllUsers);

export default userRouter;