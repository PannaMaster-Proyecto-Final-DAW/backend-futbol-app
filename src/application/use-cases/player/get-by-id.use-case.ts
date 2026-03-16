import type { Player } from "../../../domain/entities/player.entity.js";
import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

/**
 * Use case to retrieve a player by its ID.
 */
export class GetPlayerByIdUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    /**
     * Executes the retrieval of a player by its ID.
     * @param input - The input data containing the player ID.
     * @returns A promise that resolves to the found Player entity.
     */
    async execute(id: string): Promise<Player | null> {
        return this.playerRepository.getById(id);
    }
}