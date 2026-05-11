import { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

/**
 * Use Case to retrieve a user by ID.
 */
export class GetUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the retrieval of a user by ID.
     * @param id The ID of the user to retrieve.
     * @returns The User entity if found, null otherwise.
     */
    async execute(id: string): Promise<User | null> {
        return this.userRepository.getById(id);
    }
}
