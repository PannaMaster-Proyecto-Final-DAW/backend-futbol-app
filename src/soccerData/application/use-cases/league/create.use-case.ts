import { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

// Port ID generation 
export interface IdGenerator {
    generateId(): string;
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
        const id = this.idGenerator.generateId();

        // 3. Creates the league entity
        const league = new League(id, input.name, country, input.category);

        // 4. Saves the league using the repository
        return this.leagueRepository.create(league);
    }
}