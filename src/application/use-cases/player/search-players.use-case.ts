import { Player, PlayerPosition } from "../../../domain/entities/player.entity.js";
import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

export interface SearchPlayersInput {
    teamId?: string;
    countryId?: string;
    position?: PlayerPosition; // @QUESTION: Should this be a string like the other two?
}

/**
 * Use case to search players based on multiple criteria.
 * This combines multiple repository search methods into one use case.
 */
export class SearchPlayersUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    /**
     * Executes the search for players based on provided filters.
     * @param input - Filter criteria (teamId, countryId, position).
     * @returns A promise that resolves to an array of Player entities.
     */
    async execute(input: SearchPlayersInput): Promise<Player[]> {
        const { teamId, countryId, position } = input;

        // Combine logic based on available filters
        if (teamId && countryId && position) {
            return this.playerRepository.getByTeamAndCountryAndPosition(teamId, countryId, position);
        }

        if (teamId && countryId) {
            return this.playerRepository.getByTeamAndCountry(teamId, countryId);
        }

        if (teamId && position) {
            return this.playerRepository.getByTeamAndPosition(teamId, position);
        }

        if (teamId) {
            return this.playerRepository.getByTeam(teamId);
        }

        if (countryId) {
            return this.playerRepository.getByCountry(countryId);
        }

        if (position) {
            return this.playerRepository.getByPosition(position);
        }

        // If no filters provided, return all players
        return this.playerRepository.getAll();
    }
}
