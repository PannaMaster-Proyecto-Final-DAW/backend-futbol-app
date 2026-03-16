import type { Team } from "../../../domain/entities/team.entity.js";
import { Team as TeamEntity } from "../../../domain/entities/team.entity.js";
import type { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import type { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

// Input for Team update
export interface UpdateTeamInput {
    id: string;
    name?: string;
    leagueId?: string;
}

/**
 * Use case to update an existing team.
 */
export class UpdateTeamUseCase {
    constructor(
        private readonly teamRepository: TeamRepository,
        private readonly leagueRepository: LeagueRepository
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

        // 2. Resolve league reference
        let league = existingTeam.league;
        if (input.leagueId !== undefined && input.leagueId !== existingTeam.league.id) {
            const foundLeague = await this.leagueRepository.getById(input.leagueId);
            if (!foundLeague) {
                throw new Error(`League with id ${input.leagueId} not found`);
            }
            league = foundLeague;
        }

        // 3. Update fields
        const updatedTeam = new TeamEntity(
            existingTeam.id,
            input.name ?? existingTeam.name,
            league
        );

        // 4. Save changes
        return this.teamRepository.update(input.id, updatedTeam);
    }
}
