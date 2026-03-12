import { Team } from "../../../domain/entities/team.entity.js";
import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import { League } from "../../../domain/entities/league.entity.js";

// Port ID generation 
export interface IdGenerator {
    generateId(): string;
}

// Input for Team creation
export interface CreateTeamInput {
    name: string;
    league: League;
}

// Use Case to create a new team
export class CreateTeamUseCase {
    constructor(
        private readonly teamRepository: TeamRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a team
     * @param input - The input data for creating a team
     * @returns The created team
     */
    async execute(input: CreateTeamInput): Promise<Team> {
        // 1. Generates a unique ID 
        const id = this.idGenerator.generateId();

        // 2. Creates the team entity
        const team = new Team(id, input.name, input.league);

        // 3. Saves the team using the repository
        return this.teamRepository.create(team);
    }
}
