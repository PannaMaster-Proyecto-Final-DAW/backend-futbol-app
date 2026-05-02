import { League } from "../../../domain/entities/league.entity.js";
import type { LeagueCategory } from "../../../domain/entities/league.entity.js";
import type { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";
import { createLeagueSchema } from "../../../infrastructure/validation/schemas/league.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

// Port ID generation 
export interface IdGenerator {
    generate(): string;
}

// Input for League creation
export interface CreateLeagueInput {
    name: string;
    countryId: string;
    category: LeagueCategory;
    pictureUrl: string;
}

// Use Case to create a new league
export class CreateLeagueUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository,
        private readonly countryRepository: CountryRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a league
     * 1. Fetches the country by ID
     * 2. Generates a unique ID
     * 3. Creates the league entity
     * 4. Saves the league using the repository
     * 
     * @param input - The input data for creating a league
     * @returns The created league
     */
    async execute(input: CreateLeagueInput): Promise<League> {
        const validatedInput = validateData(createLeagueSchema, input);

        // 1. Fetch the country by ID
        const country = await this.countryRepository.getById(validatedInput.countryId);
        if (!country) {
            throw new Error(`Country with id ${validatedInput.countryId} not found`);
        }

        // 2. Generates a unique ID 
        const newId = this.idGenerator.generate();

        // 3. Creates the league entity
        const leagueInstance = new League(
            newId,
            validatedInput.name,
            country,
            validatedInput.category,
            validatedInput.pictureUrl || ''
        );

        // 4. Saves the league using the repository
        return this.leagueRepository.create(leagueInstance);
    }
}
