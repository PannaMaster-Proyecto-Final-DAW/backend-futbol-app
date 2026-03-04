import { User } from "../entities/user.entity.js";

export interface UserRepository {
    //CRUD
    create(user: User): Promise<User>;
    update(id: string): Promise<User>;
    delete(id: string): Promise<User>;

    //Search the user by id / userName / email / all of them
    getById(id: string): Promise<User | null>;
    getByUserName(userName: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    getAll(): Promise<User[]>;
}