import type { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import { League as LeagueEntity } from "../../../domain/entities/league.entity.js";
import type { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";
import { updateLeagueSchema } from "../../../infrastructure/validation/schemas/league.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

// Input for League update
export interface UpdateLeagueInput {
    id: string;
    name?: string;
    countryId?: string;
    category?: LeagueCategory;
    pictureUrl?: string;
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
        const validatedInput = validateData(updateLeagueSchema, input);

        // 1. Get existing league
        const existingLeague = await this.leagueRepository.getById(input.id);
        if (!existingLeague) return null;

        // 2. Resolve country reference
        let country = existingLeague.country;
        if (validatedInput.countryId !== undefined && validatedInput.countryId !== existingLeague.country.id) {
            const foundCountry = await this.countryRepository.getById(validatedInput.countryId);
            if (!foundCountry) {
                throw new Error(`Country with id ${validatedInput.countryId} not found`);
            }
            country = foundCountry;
        }

        // 3. Update fields
        const updatedLeague = new LeagueEntity(
            existingLeague.id,
            validatedInput.name ?? existingLeague.name,
            country,
            validatedInput.category ?? existingLeague.category,
            validatedInput.pictureUrl ?? existingLeague.pictureUrl
        );

        // 4. Save changes
        return this.leagueRepository.update(input.id, updatedLeague);
    }
}
