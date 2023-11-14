import { AppDataSource } from "../data-source.js";
import { Task } from "../entities/Task.js";
import { userRepo } from "./UserRepository.js";
export const taskRepo = AppDataSource.getRepository(Task);
export class TaskRepository {
    static async getAllTasks() {
        return await taskRepo.find({ relations: { user: true } });
    }
    static async getTaskById(id) {
        return await taskRepo.findOne({ relations: { user: true }, where: { id } });
    }
    static async createUserTask(userId, task) {
        const user = await this.getUserById(userId);
        if (!user)
            return null;
        const newTask = { ...task, user };
        const savedTask = await taskRepo.save(newTask);
        return savedTask;
    }
    static async updateUserTask(userId, taskId, task) {
        const taskToBeUpdated = await this.getUserTaskById(userId, taskId);
        if (!taskToBeUpdated)
            return null;
        await taskRepo.update(taskId, task);
        return this.getTaskById(taskId);
    }
    static async completeUserTask(userId, taskId) {
        const taskToBeUpdated = await this.getUserTaskById(userId, taskId);
        if (!taskToBeUpdated)
            return { message: `Error: Couldn't find task with id: ${taskId} associated with user id: ${userId}` };
        await taskRepo.update(taskId, { ...taskToBeUpdated, completed: true });
        return this.getTaskById(taskId);
    }
    static async deleteUserTask(userId, taskId) {
        const taskToBeDeleted = await this.getUserTaskById(userId, taskId);
        if (!taskToBeDeleted)
            return { message: `Error: Couldn't find task with id: ${taskId} associated with user id: ${userId}` };
        await taskRepo.remove(taskToBeDeleted);
        return { message: "Task deleted!!" };
    }
    static async getUserTaskById(userId, taskId) {
        return taskRepo.findOneBy({ user: { id: userId }, id: taskId });
    }
    static async getUserById(id) {
        return userRepo.findOneBy({ id });
    }
}
