import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";
import type { Country } from "../../../domain/entities/country.entity.js";


/**
 * Input for updating a country.
 * All fields are optional to allow partial updates.
 */
export interface UpdateCountryInput {
    id: string;
    name?: string; // @QUESTION
    pictureUrl?: string;
}

// Use Case to update an existing country.
export class UpdateCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
    ) { }

    /**
     * Executes the update of a country.
     * @param input - Input object with the data to update.
     * @returns The updated Country entity.
     * @throws Error if the country is not found.
     */
    async execute(input: UpdateCountryInput): Promise<Country> {
        const country = await this.countryRepository.getById(input.id);
        if (!country) {
            throw new Error(`Country with id ${input.id} not found`);
        }

        // Update fields if they are present in the Input
        if (input.name !== undefined) country.name = input.name;
        if (input.pictureUrl !== undefined) country.pictureUrl = input.pictureUrl;

        return await this.countryRepository.update(country);
    }
}
