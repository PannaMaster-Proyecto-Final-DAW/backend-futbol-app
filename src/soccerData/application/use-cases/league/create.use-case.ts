import { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import { Country } from "../../../domain/entities/country.entity.js";

// Port ID generation 
export interface IdGenerator {
    generateId(): string;
}

// Input for League creation
export interface CreateLeagueInput {
    name: string;
    country: Country;
    category: LeagueCategory;
}

// Use Case to create a new league
export class CreateLeagueUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a league
     * @param input - The input data for creating a league
     * @returns The created league
     */
    async execute(input: CreateLeagueInput): Promise<League> {
        // 1. Generates a unique ID 
        const id = this.idGenerator.generateId();

        // 2. Creates the league entity
        const league = new League(id, input.name, input.country, input.category);

        // 3. Saves the league using the repository
        return this.leagueRepository.create(league);
    }
}