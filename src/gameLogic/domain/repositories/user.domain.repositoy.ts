import { User, UserRole } from "../entities/user.entity.js";

export interface UserRepository {
    //CRUD
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<boolean>;

    //Search the user by id / userName / email / all of them
    getById(id: string): Promise<User | null>;
    getByUserName(userName: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    getByRole(role: UserRole): Promise<User[]>;
    getAll(): Promise<User[]>;
}