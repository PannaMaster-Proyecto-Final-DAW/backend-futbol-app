import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";
import { UserLeague } from "../../../domain/entities/user-league.entity.js";
import { createUserLeagueSchema } from "../../../infrastructure/validation/schemas/user-league.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

// Port for ID generation
export interface IdGenerator {
    generate(): string;
}

// Port for Invite Code generation
export interface InviteCodeGenerator {
    generate(): string;
}

export interface CreateLeagueInput {
    name: string;
}

export class CreateUserLeagueUseCase {
    constructor(
        private readonly userLeagueRepository: UserLeagueRepository,
        private readonly idGenerator: IdGenerator,
        private readonly inviteCodeGenerator: InviteCodeGenerator
    ) { }

    async execute(input: CreateLeagueInput): Promise<UserLeague> {
        const validatedInput = validateData(createUserLeagueSchema, input);

        // Verify if a league with that name already exists
        const existingLeague = await this.userLeagueRepository.getByName(validatedInput.name);
        if (existingLeague) {
            throw new Error('A league with this name already exists');
        }

        // Create new league
        const newLeague = new UserLeague(
            this.idGenerator.generate(),
            validatedInput.name,
            this.inviteCodeGenerator.generate(),
            [] // Start with no members
        );

        return this.userLeagueRepository.create(newLeague);
    }
}
