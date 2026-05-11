import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

/**
 * Use case to delete a player.
 */
export class DeletePlayerUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    /**
     * Executes the deletion of a player.
     * @param id - The ID of the player to delete.
     * @returns A promise that resolves to a boolean indicating success.
     */
    async execute(id: string): Promise<boolean> {
        return this.playerRepository.delete(id);
    }
}
