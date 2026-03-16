import { League } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

export interface GetLeagueByIdInput {
    id: string;
}

/**
 * Use case to retrieve a league by its ID.
 */
export class GetLeagueByIdUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the retrieval of a league by its ID.
     * @param input - The input data containing the league ID.
     * @returns A promise that resolves to the found League entity.
     */
    async execute(input: GetLeagueByIdInput): Promise<League | null> {
        return this.leagueRepository.getById(input.id);
    }
}
