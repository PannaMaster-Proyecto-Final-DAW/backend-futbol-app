import { League } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

export interface GetLeagueByCountryInput {
    countryId: string;
}

/**
 * Use case to retrieve leagues by country ID.
 */
export class GetLeagueByCountryUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the retrieval of leagues by country ID.
     * @param input - The input data containing the country ID.
     * @returns A promise that resolves to an array of League entities.
     */
    async execute(input: GetLeagueByCountryInput): Promise<League[]> {
        return this.leagueRepository.getByCountry(input.countryId);
    }
}
