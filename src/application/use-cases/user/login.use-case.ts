import { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";
import { PasswordHasher } from "../../interfaces/password-hasher.interface.js";

export interface LoginInput {
    identifier: string; // email or userName
    password: string;
}

/**
 * Use case to handle user login.
 * Validates credentials and returns the user object without the password.
 */
export class LoginUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ) { }

    async execute(input: LoginInput): Promise<Partial<User>> {
        // Find user by email or username
        let user: User | null = null;
        
        // Try as email first
        user = await this.userRepository.getByEmail(input.identifier);
        
        // If not found, try as username
        if (!user) {
            user = await this.userRepository.getByUserName(input.identifier);
        }

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await this.passwordHasher.compare(input.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Return user data without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
