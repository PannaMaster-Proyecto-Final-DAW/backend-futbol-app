import type { Country } from "../../../domain/entities/country.entity.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

export interface GetCountryByIdInput {
    id: string;
}

/**
 * Use case to retrieve a country by its ID.
 */
export class GetCountryByIdUseCase {
    constructor(
        private readonly countryRepository: CountryRepository
    ) { }

    /**
     * Executes the retrieval of a country by its ID.
     * @param input - The input data containing the country ID.
     * @returns A promise that resolves to the found Country entity.
     */
    async execute(input: GetCountryByIdInput): Promise<Country | null> {
        return this.countryRepository.getById(input.id);
    }
}
