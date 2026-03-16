import { Country } from "../../../domain/entities/country.entity.js";
import { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

// Port ID generation
export interface IdGenerator {
    generate(): string;
}

// Input for Country creation
export interface CreateCountryInput {
    name: string;
}

// Use Case to create a new country
export class CreateCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a country
     * @param input - The input data for creating a country
     * @returns The created country
     */

    async execute(input: CreateCountryInput): Promise<Country> {
        // 1. Generates a unique ID 
        const id = this.idGenerator.generate();

        // 2. Creates the country entity
        const country = new Country(id, input.name);

        // 3. Saves the country using the repository
        return this.countryRepository.create(country);
    }
}
