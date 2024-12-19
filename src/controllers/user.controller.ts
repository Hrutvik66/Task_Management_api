// express
import { Request, Response } from "express";
// jwt
import jwt, { Secret } from "jsonwebtoken";
// bcrypt
import bcrypt from "bcrypt";
// user services
import userService from "../services/user.service";
// dotenv
import dotenv from 'dotenv'
import CustomError from "../lib/CustomError";
dotenv.config({})

const {
  getAllUsers,
  getUserByUserName,
  getUserByEmail,
  createUser
} = userService;

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Failed to get all users:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  //   Register user
  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new CustomError("User already exists", 400);
      }
      //unique username
      const existingUserName = await getUserByUserName(username);
      if (existingUserName) {
        throw new CustomError("Username should be unique", 400);
      }
      //hash password
      if (!password) {
        throw new CustomError("Password is required", 400);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(username, email, hashedPassword);
      res.status(201).json(user);
    } catch (error) {
      console.error("Failed to register user:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }
  //   Login user
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = (await getUserByEmail(email))?.toJSON();
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new CustomError("Incorrect password", 401);
      }
      const SECRET_KEY: Secret = process.env.SECRET_KEY!!;
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ user, token });
    } catch (error) {
      console.error("Failed to login user:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode || 500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }
}

export default new UserController();