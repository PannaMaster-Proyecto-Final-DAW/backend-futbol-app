import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import { League } from "../../../domain/entities/league.entity.js";

// Input for Team update
export interface UpdateTeamInput {
    id: string;
    name?: string;
    league?: League;
}

/**
 * Use case to update an existing team.
 */
export class UpdateTeamUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the update of a team.
     * @param input - The data to update including the team ID.
     * @returns A promise that resolves to the updated team or null if not found.
     */
    async execute(input: UpdateTeamInput): Promise<Team | null> {
        // 1. Get existing team
        const existingTeam = await this.teamRepository.getById(input.id);
        if (!existingTeam) return null;

        // 2. Update fields
        const updatedTeam = new Team(
            existingTeam.id,
            input.name ?? existingTeam.name,
            input.league ?? existingTeam.league
        );

        // 3. Save changes
        return this.teamRepository.update(input.id, updatedTeam);
    }
}
