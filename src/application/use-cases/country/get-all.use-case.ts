import type { Country } from "../../../domain/entities/country.entity.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

/**
 * Use case to retrieve all countries.
 */
export class GetAllCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository
    ) { }

    /**
     * Executes the retrieval of all countries.
     * @returns A promise that resolves to an array of Country entities.
     */
    async execute(): Promise<Country[]> {
        return this.countryRepository.getAll();
    }
}
