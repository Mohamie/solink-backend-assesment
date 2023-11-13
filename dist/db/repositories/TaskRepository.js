import { AppDataSource } from "../data-source.js";
import { Task } from "../entities/Task.js";
import { userRepo } from "./UserRepository.js";
export const taskRepo = AppDataSource.getRepository(Task);
export class TaskRepository {
    static async getUserTasks(userId) {
        return await taskRepo.findBy({ user: { id: userId } });
    }
    static async getUserTask(userId, taskId) {
        return await taskRepo.findOneBy({ id: taskId, user: { id: userId } });
    }
    static async createUserTask(userId, task) {
        const user = await this.getUserById(userId);
        if (!user)
            return { message: `Error: Couldn't find user with id: ${userId}` };
        const newTask = { ...task, user };
        await taskRepo.save(newTask);
        return { message: "Task created!!" };
    }
    static async updateUserTask(userId, taskId, task) {
        const taskToBeUpdated = await this.getUserTaskById(userId, taskId);
        if (!taskToBeUpdated)
            return { message: `Error: Couldn't find task with id: ${taskId} associated with user id: ${userId}` };
        await taskRepo.update(taskId, task);
        return { message: "Task Updated!!" };
    }
    static async completeUserTask(userId, taskId) {
        const taskToBeUpdated = await this.getUserTaskById(userId, taskId);
        if (!taskToBeUpdated)
            return { message: `Error: Couldn't find task with id: ${taskId} associated with user id: ${userId}` };
        await taskRepo.update(taskId, { ...taskToBeUpdated, completed: true });
        return { message: "Task marked completed!!" };
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
