import { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import { Country } from "../../../domain/entities/country.entity.js";

// Input for League update
export interface UpdateLeagueInput {
    id: string;
    name?: string;
    country?: Country;
    category?: LeagueCategory;
}

/**
 * Use case to update an existing league.
 */
export class UpdateLeagueUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the update of a league.
     * @param input - The data to update including the league ID.
     * @returns A promise that resolves to the updated league or null if not found.
     */
    async execute(input: UpdateLeagueInput): Promise<League | null> {
        // 1. Get existing league
        const existingLeague = await this.leagueRepository.getById(input.id);
        if (!existingLeague) return null;

        // 2. Update fields
        const updatedLeague = new League(
            existingLeague.id,
            input.name ?? existingLeague.name,
            input.country ?? existingLeague.country,
            input.category ?? existingLeague.category
        );

        // 3. Save changes
        return this.leagueRepository.update(input.id, updatedLeague);
    }
}
