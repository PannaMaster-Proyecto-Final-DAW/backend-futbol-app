import type { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import { League as LeagueEntity } from "../../../domain/entities/league.entity.js";
import type { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

// Input for League update
export interface UpdateLeagueInput {
    id: string;
    name?: string;
    countryId?: string;
    category?: LeagueCategory;
}

/**
 * Use case to update an existing league.
 */
export class UpdateLeagueUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository,
        private readonly countryRepository: CountryRepository
    ) { }

    /**
     * Executes the update of a league.
     * 
     * @param input - The data to update including the league ID.
     * @returns A promise that resolves to the updated league or null if not found.
     */
    async execute(input: UpdateLeagueInput): Promise<League | null> {
        // 1. Get existing league
        const existingLeague = await this.leagueRepository.getById(input.id);
        if (!existingLeague) return null;

        // 2. Resolve country reference
        let country = existingLeague.country;
        if (input.countryId !== undefined && input.countryId !== existingLeague.country.id) {
            const foundCountry = await this.countryRepository.getById(input.countryId);
            if (!foundCountry) {
                throw new Error(`Country with id ${input.countryId} not found`);
            }
            country = foundCountry;
        }

        // 3. Update fields
        const updatedLeague = new LeagueEntity(
            existingLeague.id,
            input.name ?? existingLeague.name,
            country,
            input.category ?? existingLeague.category
        );

        // 4. Save changes
        return this.leagueRepository.update(input.id, updatedLeague);
    }
}
