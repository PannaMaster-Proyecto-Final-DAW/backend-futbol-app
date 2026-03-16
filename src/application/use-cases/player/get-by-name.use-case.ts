import type { Player } from "../../../domain/entities/player.entity.js";
import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

/**
 * Use case to retrieve a player by its name.
 */
export class GetPlayerByNameUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    /**
     * Executes the retrieval of a player by its name.
     * @param name - The name of the player to retrieve.
     * @returns A promise that resolves to the found Player entity.
     */
    async execute(name: string): Promise<Player | null> {
        return this.playerRepository.getByName(name);
    }
}
