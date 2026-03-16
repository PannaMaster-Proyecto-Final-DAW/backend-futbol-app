import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";

export interface GetTeamByIdInput {
    id: string;
}

/**
 * Use case to retrieve a team by its ID.
 */
export class GetTeamByIdUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the retrieval of a team by its ID.
     * @param input - The input data containing the team ID.
     * @returns A promise that resolves to the found Team entity or null.
     */
    async execute(input: GetTeamByIdInput): Promise<Team | null> {
        return this.teamRepository.getById(input.id);
    }
}
