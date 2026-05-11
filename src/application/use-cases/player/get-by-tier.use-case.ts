import { Player } from "../../../domain/entities/player.entity.js";
import { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

export interface GetPlayersByTierInput {
    tier: number;
}

/**
 * Use case to retrieve players by tier.
 */
export class GetPlayersByTierUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    /**
     * Executes the retrieval of players by tier.
     * @param input - The input data containing the tier.
     * @returns A promise that resolves to an array of Player entities.
     */
    async execute(input: GetPlayersByTierInput): Promise<Player[]> {
        return this.playerRepository.getByTier(input.tier);
    }
}
