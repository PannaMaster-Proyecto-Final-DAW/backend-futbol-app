import { UserRepository } from "../../../domain/repositories/user.domain.repositoy.js";
import { User } from "../../../domain/entities/user.entity.js";

/**
 * Use Case to retrieve all users.
 */
export class GetAllUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the retrieval of all users.
     * @returns A list of all User entities.
     */
    async execute(): Promise<User[]> {
        return this.userRepository.getAll();
    }
}