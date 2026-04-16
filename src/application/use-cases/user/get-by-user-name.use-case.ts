import { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

/**
 * Use Case to retrieve a user by userName.
 */
export class GetUserByUserNameUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the retrieval of a user by userName.
     * @param userName The userName of the user to retrieve.
     * @returns The User entity if found, null otherwise.
     */
    async execute(userName: string): Promise<User | null> {
        return this.userRepository.getByUserName(userName);
    }
}
