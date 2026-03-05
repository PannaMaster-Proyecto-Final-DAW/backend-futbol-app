import type { UserRepository } from "../../domain/repositories/user.domain.repositoy.js";
import type { User, UserRole } from "../../domain/entities/user.entity.js";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async update(user: User): Promise<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index === -1) {
            throw new Error('User not found');
        }
        this.users[index] = user;
        return user;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        this.users.splice(index, 1);
        return true;
    }

    async getById(id: string): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }

    async getByUserName(userName: string): Promise<User | null> {
        return this.users.find(u => u.userName === userName) || null;
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.email === email) || null;
    }

    async getByRole(role: UserRole): Promise<User[]> {
        return this.users.filter(u => u.role === role);
    }

    async getAll(): Promise<User[]> {
        return this.users;
    }
}
