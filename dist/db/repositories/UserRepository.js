import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
export const userRepo = AppDataSource.getRepository(User);
export class UserRepository {
    static async createUser(user) {
        const savedUser = await userRepo.save(user);
        return savedUser;
    }
    static async getUsers() {
        return await userRepo.find({ relations: { tasks: true } });
    }
    static async getUsersById(id) {
        return await userRepo.findOne({ relations: { tasks: true }, where: { id } });
    }
}
