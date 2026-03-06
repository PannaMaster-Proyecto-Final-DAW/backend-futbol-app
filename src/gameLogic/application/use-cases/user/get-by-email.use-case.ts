import { UserRepository } from "../../../domain/repositories/user.domain.repositoy.js";
import { User } from "../../../domain/entities/user.entity.js";

/**
 * Use Case to retrieve a user by email.
 */
export class GetUserByEmailUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the retrieval of a user by email.
     * @param email The email of the user to retrieve.
     * @returns The User entity if found, null otherwise.
     */
    async execute(email: string): Promise<User | null> {
        return this.userRepository.getByEmail(email);
    }
}