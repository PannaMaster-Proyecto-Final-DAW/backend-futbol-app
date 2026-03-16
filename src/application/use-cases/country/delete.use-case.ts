import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

export interface DeleteCountryInput {
    id: string;
}

/*
 * Use case to delete a country
 */
export class DeleteCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository
    ) { }

    /**
     * Executes the deletion of a country
     * @param input - The input data for deleting a country
     * @returns A boolean indicating whether the deletion was successful
     */
    async execute(input: DeleteCountryInput): Promise<boolean> {
        return this.countryRepository.delete(input.id);

    }
}
