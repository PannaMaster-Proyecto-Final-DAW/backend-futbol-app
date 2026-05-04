import type { Team } from "../../../domain/entities/team.entity.js";
import { Team as TeamEntity } from "../../../domain/entities/team.entity.js";
import type { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import type { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";
import { updateTeamSchema } from "../../../infrastructure/validation/schemas/team.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

// Input for Team update
export interface UpdateTeamInput {
    id: string;
    name?: string;
    leagueId?: string;
    pictureUrl?: string;
    tier?: number;
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
        const validatedInput = validateData(updateTeamSchema, input);

        // 1. Get existing team
        const existingTeam = await this.teamRepository.getById(input.id);
        if (!existingTeam) return null;

        // 2. Resolve league reference
        let league = existingTeam.league;
        if (validatedInput.leagueId !== undefined && validatedInput.leagueId !== existingTeam.league.id) {
            const foundLeague = await this.leagueRepository.getById(validatedInput.leagueId);
            if (!foundLeague) {
                throw new Error(`League with id ${validatedInput.leagueId} not found`);
            }
            league = foundLeague;
        }

        // 3. Update fields
        const updatedTeam = new TeamEntity(
            existingTeam.id,
            validatedInput.name ?? existingTeam.name,
            league,
            validatedInput.pictureUrl ?? existingTeam.pictureUrl,
            validatedInput.tier ?? existingTeam.tier
        );

        // 4. Save changes
        return this.teamRepository.update(input.id, updatedTeam);
    }
}
