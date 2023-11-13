import { TaskRepository } from "../db/repositories/TaskRepository.js";
import { UserRepository } from "../db/repositories/UserRepository.js";
export const resolvers = {
    Query: {
        tasks: async (parent, { userId }) => await TaskRepository.getUserTasks(userId),
        task: async (parent, { userId, taskId }) => await TaskRepository.getUserTask(userId, taskId),
    },
    Mutation: {
        createUser: async (parent, { user }) => await UserRepository.createUser(user),
        createTask: async (parent, { userId, task }) => await TaskRepository.createUserTask(userId, task),
        updateTask: async (parent, { userId, taskId, task }) => await TaskRepository.updateUserTask(userId, taskId, task),
        completeTask: async (parent, { userId, taskId }) => await TaskRepository.completeUserTask(userId, taskId),
        deleteTask: async (parent, { userId, taskId }) => await TaskRepository.deleteUserTask(userId, taskId),
    }
};
