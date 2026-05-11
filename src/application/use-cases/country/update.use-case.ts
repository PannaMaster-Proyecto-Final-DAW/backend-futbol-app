import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";
import type { Country } from "../../../domain/entities/country.entity.js";
import { updateCountrySchema } from "../../../infrastructure/validation/schemas/country.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";


/**
 * Input for updating a country.
 * All fields are optional to allow partial updates.
 */
export interface UpdateCountryInput {
    id: string;
    name?: string; // @QUESTION
    pictureUrl?: string;
    tierMale?: number;
    tierFemale?: number;
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
        const validatedInput = validateData(updateCountrySchema, input);

        const country = await this.countryRepository.getById(input.id);
        if (!country) {
            throw new Error(`Country with id ${input.id} not found`);
        }

        // Update fields if they are present in the Input
        if (validatedInput.name !== undefined) country.name = validatedInput.name;
        if (validatedInput.pictureUrl !== undefined) country.pictureUrl = validatedInput.pictureUrl;
        if (validatedInput.tierMale !== undefined) country.tierMale = validatedInput.tierMale;
        if (validatedInput.tierFemale !== undefined) country.tierFemale = validatedInput.tierFemale;

        return await this.countryRepository.update(country);
    }
}
