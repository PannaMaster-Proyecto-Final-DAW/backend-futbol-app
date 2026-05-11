import { UserRepository } from "../../../domain/repositories/user.domain.repository.js";

/**
 * Use Case to delete a user.
 */
export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the deletion of a user.
     * @param id The ID of the user to delete.
     * @returns The deleted user entity.
     */
    async execute(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }
}
