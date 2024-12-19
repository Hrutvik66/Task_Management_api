// Tasks model
import { Task } from "../models/models";
// Custom error class
import CustomError from "../lib/CustomError";

class TaskService {
  /**
   * Creates a new task.
   * @param title the title of the task
   * @param description the description of the task
   * @returns the created task
   * @throws {Error} if an error occurs while creating the task
   */
  async createTask(title: string, description: string, userId: number) {
    // Implemention logic to create a new task
    try {
      if (!title || !description) {
        throw new CustomError("Title and description are required", 400);
      }
      const task = await Task.create({ title, description, userId });
      return task;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error("Failed to create task:", error);
      throw new CustomError("Failed to get all tasks", 500);
    }
  }

  /**
   * Retrieves all tasks.
   * @returns all tasks
   * @throws {Error} if an error occurs while retrieving all tasks
   */
  async getAllTasks() {
    // Implemention logic to retrieve all tasks
    try {
      // limit to 10 tasks for now
      const tasks = await Task.findAll({ limit: 10 });
      if (!tasks) {
        throw new CustomError("No tasks found", 404);
      }
      return tasks;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error("Failed to get all tasks:", error);
      throw new CustomError("Failed to get all tasks", 500);
    }
  }

  /**
   * Retrieves a task by its id.
   * @param taskId the id of the task to retrieve
   * @returns the task with the given id
   * @throws {Error} if the task with the given id does not exist
   */
  async getTaskById(taskId: number) {
    // Implemention logic to retrieve a task by id
    try {
      if (taskId === null || taskId === undefined) {
        throw new CustomError("Task ID is required", 400);
      }
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new CustomError("Task not found", 404);
      }
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      console.error("Failed to get task by id:", error);
      throw new CustomError("Failed to get task by id", 500);
    }
  }

  /**
   * Updates a task with the given id.
   * @param taskId the id of the task to update
   * @param title the new title of the task
   * @param description the new description of the task
   * @param status the new status of the task
   * @returns the updated task
   */
  async updateTask(
    taskId: number,
    title?: string | null,
    description?: string | null,
    status?: string | null
  ) {
    try {
      if (taskId === null || taskId === undefined) {
        throw new CustomError("Task ID is required", 400);
      }
      const taskRecord = await Task.findByPk(taskId);
      if (!taskRecord) {
        throw new CustomError("Task not found", 404);
      }

      const task = taskRecord.toJSON();

      await Task.update(
        {
          title: title ?? task.title,
          description: description ?? task.description,
          status: status ?? task.status,
        },
        {
          where: {
            id: taskId,
          },
        }
      );

      const updatedTask = await Task.findByPk(taskId);
      if (!updatedTask) {
        throw new CustomError("Failed to retrieve updated task", 500);
      }

      return updatedTask;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error instanceof CustomError
        ? error
        : new Error("An unexpected error occurred");
    }
  }

  /**
   * Deletes a task with the given id.
   * @param taskId the id of the task to delete
   * @returns the number of rows affected
   */
  async deleteTask(taskId: number | null | undefined) {
    if (taskId === null || taskId === undefined) {
      throw new CustomError("Task ID is required", 400);
    }

    try {
      const deletedRows = await Task.destroy({
        where: {
          id: taskId,
        },
      });
      if (deletedRows === 0) {
        throw new CustomError(`Task with ID ${taskId} not found`, 404);
      }
      return deletedRows;
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error instanceof CustomError
        ? error
        : new Error("An unexpected error occurred");
    }
  }
}

export default new TaskService();
