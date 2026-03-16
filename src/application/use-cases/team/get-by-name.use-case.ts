import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";

export interface GetTeamByNameInput {
    name: string;
}

/**
 * Use case to retrieve a team by its name.
 */
export class GetTeamByNameUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the retrieval of a team by its name.
     * @param input - The input data containing the team name.
     * @returns A promise that resolves to the found Team entity or null.
     */
    async execute(input: GetTeamByNameInput): Promise<Team | null> {
        return this.teamRepository.getByName(input.name);
    }
}
