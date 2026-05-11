import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";

/**
 * Use case to retrieve all teams.
 */
export class GetAllTeamUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the retrieval of all teams.
     * @returns A promise that resolves to an array of Team entities.
     */
    async execute(): Promise<Team[]> {
        return this.teamRepository.getAll();
    }
}
