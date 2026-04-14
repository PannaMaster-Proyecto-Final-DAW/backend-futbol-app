import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";

export interface GetTeamByTierInput {
    tier: number;
}

/**
 * Use case to retrieve an array of teams by its tier.
 */
export class GetTeamByTierUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the retrieval of a team by its tier.
     * @param input - The input data containing the team tier.
     * @returns A promise that resolves to the found Team entity or null.
     */
    async execute(input: GetTeamByTierInput): Promise<Team[]> {
        return this.teamRepository.getByTier(input.tier);
    }
}