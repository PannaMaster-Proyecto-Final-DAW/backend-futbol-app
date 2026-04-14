import { Country } from "../../../domain/entities/country.entity.js";
import { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

export interface GetCountriesByTierInput {
    tier: number;
    category: 'male' | 'female';
}

/**
 * Use case to retrieve countries by tier and category.
 */
export class GetCountriesByTierUseCase {
    constructor(
        private readonly countryRepository: CountryRepository
    ) { }

    /**
     * Executes the retrieval of countries by tier and category.
     * @param input - The input data containing the tier and category.
     * @returns A promise that resolves to an array of Country entities.
     */
    async execute(input: GetCountriesByTierInput): Promise<Country[]> {
        return this.countryRepository.getByTier(input.tier, input.category);
    }
}
