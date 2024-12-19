// express
import { Request, Response } from "express";
// tasks service
import taskService from "../services/task.service";
import { TaskDto } from "../dtos/task.dto";
// custom Requests
import { CustomJwtPayload, CustomRequest } from "../middleware/auth.middleware";
// custom error
import CustomError from "../lib/CustomError";

const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } =
  taskService;

class TaskController {
  public createTask = async (req: Request, res: Response) => {
    try {
      const { title, description }: TaskDto = req.body;
      let id: number = 0;
      if ((req as CustomRequest).token) {
        id = ((req as CustomRequest).token as CustomJwtPayload).id;
      }
      const task = await createTask(title, description, id);
      res.status(201).json(task);
    } catch (error) {
      console.error("Failed to create task:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };

  public getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Failed to get all tasks:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };

  public getTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      if (isNaN(taskId)) {
        throw new CustomError("Task id must be a number", 400);
      }
      const task = await getTaskById(taskId);
      res.status(200).json(task);
    } catch (error) {
      console.error("Failed to get task by id:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  public updateTask = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      if (isNaN(taskId)) {
        throw new CustomError("Task id must be a number", 400);
      }
      const { title, description, status } = req.body;
      const updatedRows = await updateTask(taskId, title, description, status);
      res.status(200).json(updatedRows);
    } catch (error) {
      console.error("Failed to update task:", error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  public deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      if (isNaN(taskId)) {
        throw new CustomError("Task id must be a number", 400);
      }
      await deleteTask(taskId);
      res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error("Failed to delete task:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}

export default new TaskController();
