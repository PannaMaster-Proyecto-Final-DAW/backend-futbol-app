import { UserRepository } from "../../../domain/repositories/user.domain.repositoy.js";
import { User, UserRole } from "../../../domain/entities/user.entity.js";

/**
 * Use Case to retrieve users by role.
 */
export class GetUsersByRoleUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the retrieval of users by role.
     * @param role The role to filter by.
     * @returns A list of User entities matching the role.
     */
    async execute(role: UserRole): Promise<User[]> {
        return this.userRepository.getByRole(role);
    }
}
