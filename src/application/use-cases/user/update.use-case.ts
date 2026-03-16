import { User, UserRole } from "../../../domain/entities/user.entity.js";
import { UserRepository } from "../../../domain/repositories/user.domain.repositoy.js";

export interface UpdateInput {
    userName?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}

export class UpdateUserUseCase {
    constructor(
        private readonly UserRepository: UserRepository
    ) { }

    /**
     * Executes the update process.
     * 1. Fetches the user by ID to ensure it exists.
     * 2. Modifies only the fields that are present in the INPUT.
     * 3. Persists the changes.
     * 
     * @param id - The ID of the user to update.
     * @param input - Data Transfer Object containing partial updates.
     * @returns The updated user entity.*/

    async execute(id: string, input: UpdateInput): Promise<User> {
        const user = await this.UserRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }

        //Update only the fields that are present in the input
        if (input.userName !== undefined) {
            user.userName = input.userName;
        }
        if (input.email !== undefined) {
            user.email = input.email;
        }
        if (input.password !== undefined) {
            user.password = input.password;
        }
        if (input.role !== undefined) {
            user.role = input.role;
        }

        return this.UserRepository.update(user);
    }
}