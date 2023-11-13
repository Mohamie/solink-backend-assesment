import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
export const userRepo = AppDataSource.getRepository(User);
export class UserRepository {
    static async createUser(user) {
        await userRepo.save(user);
        return { message: "User created!!" };
    }
}
