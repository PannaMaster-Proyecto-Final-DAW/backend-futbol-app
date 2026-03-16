import { League } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

export interface GetLeagueByNameInput {
    name: string;
}

/**
 * Use case to retrieve a league by its name.
 */
export class GetLeagueByNameUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the retrieval of a league by its name.
     * @param input - The input data containing the league name.
     * @returns A promise that resolves to the found League entity.
     */
    async execute(input: GetLeagueByNameInput): Promise<League | null> {
        return this.leagueRepository.getByName(input.name);
    }
}
