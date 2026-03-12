import { Player } from "../../../domain/entities/player.entity.js";
import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

/**
 * Use case to retrieve all players.
 */
export class GetAllPlayerUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    /**
     * Executes the retrieval of all players.
     * @returns A promise that resolves to an array of Player entities.
     */
    async execute(): Promise<Player[]> {
        return this.playerRepository.getAll();
    }
}
