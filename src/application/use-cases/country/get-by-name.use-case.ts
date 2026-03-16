import type { Country } from "../../../domain/entities/country.entity.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

export interface GetCountryByNameInput {
    name: string;
}

/**
 * Use case to retrieve a country by its name.
 */
export class GetCountryByNameUseCase {
    constructor(
        private readonly countryRepository: CountryRepository
    ) { }

    /**
     * Executes the retrieval of a country by its name.
     * @param input - The input data containing the country name.
     * @returns A promise that resolves to the found Country entity.
     */
    async execute(input: GetCountryByNameInput): Promise<Country | null> {
        return this.countryRepository.getByName(input.name);
    }
}
