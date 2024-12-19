import { UserDto } from "../dtos/user.dto";
// user model
import { User } from "../models/models";
// custom error
import CustomError from "../lib/CustomError";
import { Task } from "../models/models";

class UserServices {
  /**
   * Retrieves all users.
   * @returns an array of user objects
   * @throws {Error} if an error occurs while retrieving all users
   */
  async getAllUsers() {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      });
      if (!users.length) {
        throw new CustomError("No users found", 404);
      }
      return users;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error("Failed to get all users:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
  /**
   * Retrieves a user by its id.
   * @param userId the id of the user to retrieve
   * @returns the user with the given id or null if the user does not exist
   * @throws {Error} if an error occurs while retrieving the user
   */
  async getUserById(userId: number): Promise<UserDto | null> {
    try {
      const user = await User.findByPk(userId, { include: ["tasks"] });
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      return user.toJSON();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error("Failed to get user by id:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
  /**
   * Retrieves a user by its email.
   * @param email the email of the user to retrieve
   * @returns the user with the given email or null if the user does not exist
   * @throws {Error} if an error occurs while retrieving the user
   */
  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email }, include: ["tasks"] });
      return user;  
    } catch (error) {
      console.error("Failed to get user by email:", error);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
  /**
   * Retrieves a user by its username.
   * @param username - The username of the user to retrieve.
   * @returns The user with the given username or null if the user does not exist.
   * @throws {Error} If an error occurs while retrieving the user.
   */

  async getUserByUserName(username: string) {
    if (!username) {
      throw new Error("Username is required");
    }
    try {
      const user = await User.findOne({
        where: { username },
        include: ["tasks"],
      });
      return user;
    } catch (error) {
      console.error("Failed to get user by username:", error);
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

/**
 * Creates a new user with the given username, email, and password.
 * @param username - The username of the user to create.
 * @param email - The email address of the user to create.
 * @param password - The password of the user to create.
 * @returns A promise that resolves to a UserDto object representing the created user.
 * @throws {Error} If the username, email, or password is not provided or if an error occurs while creating the user.
 */
  async createUser(
    username: string,
    email: string,
    password: string
  ) {
    if (!username) {
      throw new CustomError("Username is required", 400);
    }
    if (!email) {
      throw new CustomError("Email is required", 400);
    }
    if (!password) {
      throw new CustomError("Password is required", 400);
    }
    try {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new CustomError("Failed to create user", 500);
      }
      const userJson = user.toJSON();
      return userJson;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error("Failed to create user:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }

  /**
   * Updates a user with the given id.
   * @param userId - The id of the user to update.
   * @param username - The new username of the user.
   * @param email - The new email of the user.
   * @param password - The new password of the user.
   * @returns A promise that resolves to true if the user is successfully updated.
   * @throws {Error} If the user ID, username, email, or password is not provided or if an error occurs while updating the user.
   */
  async updateUser(
    userId: number,
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    if (!userId || !username || !email || !password) {
      throw new CustomError("User ID, username, email, and password are required", 400);
    }
    try {
      const [updatedRows] = await User.update(
        { username, email, password },
        { where: { id: userId } }
      );
      if (updatedRows === 0) {
        throw new CustomError(`User with ID ${userId} not found`, 404);
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to update user:", error);
        throw error;
      } else {
        console.error("Failed to update user:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }

  
  /**
   * Deletes a user with the given id.
   * @param userId - The id of the user to delete.
   * @returns The number of rows affected.
   * @throws {Error} If the user ID is not provided or if an error occurs while deleting the user.
   */
  async deleteUser(userId: number | null | undefined): Promise<number> {
    if (userId === null || userId === undefined) {
      throw new CustomError("User ID is required", 400);
    }
    try {
      const deletedRows = await User.destroy({ where: { id: userId } });
      if (deletedRows === 0) {
        throw new CustomError(`User with ID ${userId} not found`, 404);
      }
      return deletedRows;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to delete user:", error);
        throw error;
      } else {
        console.error("Failed to delete user:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
}

export default new UserServices();
