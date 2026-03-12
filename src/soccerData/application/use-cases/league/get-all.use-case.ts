import { League } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

/**
 * Use case to retrieve all leagues.
 */
export class GetAllLeagueUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the retrieval of all leagues.
     * @returns A promise that resolves to an array of League entities.
     */
    async execute(): Promise<League[]> {
        return this.leagueRepository.getAll();
    }
}
