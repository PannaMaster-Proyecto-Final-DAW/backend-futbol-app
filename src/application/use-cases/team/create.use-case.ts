import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

// Port ID generation 
export interface IdGenerator {
    generate(): string;
}

// Input for Team creation
export interface CreateTeamInput {
    name: string;
    leagueId: string;
    pictureUrl?: string;
    tier?: number;
}

// Use Case to create a new team
export class CreateTeamUseCase {
    constructor(
        private readonly teamRepository: TeamRepository,
        private readonly leagueRepository: LeagueRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a team
     * @param input - The input data for creating a team
     * @returns The created team
     */
    async execute(input: CreateTeamInput): Promise<Team> {
        // 1. Fetch the league by ID
        const league = await this.leagueRepository.getById(input.leagueId);
        if (!league) {
            throw new Error(`League with id ${input.leagueId} not found`);
        }

        // 2. Generates a unique ID 
        const id = this.idGenerator.generate();

        // 3. Creates the team entity
        const team = new Team(id, input.name, league, input.pictureUrl || '', input.tier ?? 1);

        // 4. Saves the team using the repository
        return this.teamRepository.create(team);
    }
}
