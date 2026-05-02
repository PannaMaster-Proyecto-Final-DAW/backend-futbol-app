import { Player, PlayerPosition, PlayerGender } from "../../../domain/entities/player.entity.js";
import { createPlayerSchema } from "../../../infrastructure/validation/schemas/player.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";
import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";
import type { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

// Port ID generation
export interface IdGenerator {
    generate(): string;
}

// Input for Player creation
export interface CreatePlayerInput {
    name: string;
    age: number;
    birthdate: string;
    position: PlayerPosition[];
    teamId: string;
    countryId: string;
    pictureUrl?: string;
    tier?: number;
    gender: PlayerGender;
}

// Use Case to create a new player
export class CreatePlayerUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository,
        private readonly teamRepository: TeamRepository,
        private readonly countryRepository: CountryRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    /**
     * Executes the creation of a player.
     * @param input - Data Transfer Object with player details.
     * @returns The created Player entity.
     */
    async execute(input: CreatePlayerInput): Promise<Player> {
        const validatedInput = validateData(createPlayerSchema, input);

        const team = await this.teamRepository.getById(validatedInput.teamId);
        if (!team) {
            throw new Error(`Team with id ${validatedInput.teamId} not found`);
        }

        const country = await this.countryRepository.getById(validatedInput.countryId);
        if (!country) {
            throw new Error(`Country with id ${validatedInput.countryId} not found`);
        }

        const newId = this.idGenerator.generate();

        const newPlayer = new Player(
            newId,
            validatedInput.name,
            validatedInput.age,
            validatedInput.birthdate,
            validatedInput.position,
            team,
            country,
            validatedInput.pictureUrl || '',
            validatedInput.tier ?? 1,
            validatedInput.gender
        );
        return this.playerRepository.create(newPlayer);
    }
}
