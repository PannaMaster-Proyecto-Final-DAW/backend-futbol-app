import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";

export interface GetTeamsByLeagueInput {
    leagueId: string;
}

/**
 * Use case to retrieve teams by their league ID.
 */
export class GetTeamsByLeagueUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the retrieval of teams by league ID.
     * @param input - The input data containing the league ID.
     * @returns A promise that resolves to an array of Team entities.
     */
    async execute(input: GetTeamsByLeagueInput): Promise<Team[]> {
        return this.teamRepository.getByLeague(input.leagueId);
    }
}
