import type { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import type { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

// Port ID generation 
export interface IdGenerator {
    generate(): string;
}

// Input for League creation
export interface CreateLeagueInput {
    name: string;
    countryId: string;
    category: LeagueCategory;
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
        // 1. Fetch the country by ID
        const country = await this.countryRepository.getById(input.countryId);
        if (!country) {
            throw new Error(`Country with id ${input.countryId} not found`);
        }

        // 2. Generates a unique ID 
        const newId = this.idGenerator.generate();

        // 3. Creates the league entity
        const newLeague = {
            id: newId,
            name: input.name,
            country: country,
            category: input.category
        } as League; // Note: Assuming League can be instantiated this way or has a constructor accepting these

        // Note: If League is a class, use: const newLeague = new League(newId, input.name, country, input.category);
        // Let's use the constructor as seen in the original file
        const leagueInstance = new (await import("../../../domain/entities/league.entity.js")).League(
            newId,
            input.name,
            country,
            input.category
        );

        // 4. Saves the league using the repository
        return this.leagueRepository.create(leagueInstance);
    }
}