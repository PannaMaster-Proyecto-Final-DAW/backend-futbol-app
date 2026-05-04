import { User, UserRole } from "../../../domain/entities/user.entity.js";
import { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { PasswordHasher } from "../../interfaces/password-hasher.interface.js";
import { updateUserSchema } from "../../../infrastructure/validation/schemas/user.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

export interface UpdateInput {
    userName?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}

export class UpdateUserUseCase {
    constructor(
        private readonly UserRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
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
        const validatedInput = validateData(updateUserSchema, input);

        const user = await this.UserRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }

        //Update only the fields that are present in the input
        if (validatedInput.userName !== undefined) {
            user.userName = validatedInput.userName;
        }
        if (validatedInput.email !== undefined) {
            user.email = validatedInput.email;
        }
        if (validatedInput.password !== undefined) {
            user.password = await this.passwordHasher.hash(validatedInput.password); // DONE
        }
        if (validatedInput.role !== undefined) {
            user.role = validatedInput.role;
        }

        return this.UserRepository.update(user);
    }
}
