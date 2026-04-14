import { Player, PlayerPosition } from "../../../domain/entities/player.entity.js";
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
    position: PlayerPosition[];
    teamId: string;
    countryId: string;
    pictureUrl?: string;
    tier?: number;
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
        const team = await this.teamRepository.getById(input.teamId);
        if (!team) {
            throw new Error(`Team with id ${input.teamId} not found`);
        }

        const country = await this.countryRepository.getById(input.countryId);
        if (!country) {
            throw new Error(`Country with id ${input.countryId} not found`);
        }

        const newId = this.idGenerator.generate();

        const newPlayer = new Player(
            newId,
            input.name,
            input.position,
            team,
            country,
            input.pictureUrl || '',
            input.tier ?? 1
        );
        return this.playerRepository.create(newPlayer);
    }
}
