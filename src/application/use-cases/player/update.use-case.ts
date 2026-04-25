import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";
import { Player, PlayerPosition, PlayerGender } from "../../../domain/entities/player.entity.js";
import type { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";

export interface UpdatePlayerInput {
    name?: string;
    age?: number;
    birthdate?: string;
    position?: PlayerPosition[];
    teamId?: string;
    countryId?: string;
    pictureUrl?: string;
    tier?: number;
    gender?: PlayerGender;
}

/**
 * Use Case to update an existing player.
 * Updates only the fields provided in the INPUT.
 */
export class UpdatePlayerUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository,
        private readonly teamRepository: TeamRepository,
        private readonly countryRepository: CountryRepository,
    ) { }

    /**
     * Executes the update process.
     * 1. Fetches the player by ID to ensure it exists.
     * 2. Modifies only the fields that are present in the INPUT.
     * 3. Persists the changes.
     * 
     * @param id - The ID of the player to update.
     * @param input - Data Transfer Object containing partial updates.
     * @returns The updated Player entity.
     */
    async execute(id: string, input: UpdatePlayerInput): Promise<Player> {
        const player = await this.playerRepository.getById(id);
        if (!player) {
            throw new Error(`Player with id ${id} not found`);
        }

        // We use strict check ( !== undefined ) to allow updates to falsy values
        if (input.name !== undefined) player.name = input.name;
        if (input.age !== undefined) {
            if (input.age < 0) throw new Error('Age cannot be negative');
            player.age = input.age;
        }
        if (input.birthdate !== undefined) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(input.birthdate)) {
                throw new Error('Birthdate must be in YYYY-MM-DD format');
            }
            player.birthdate = input.birthdate;
        }
        if (input.position !== undefined) player.position = input.position;
        if (input.pictureUrl !== undefined) player.pictureUrl = input.pictureUrl;
        if (input.tier !== undefined) player.tier = input.tier;
        if (input.gender !== undefined) player.gender = input.gender;

        if (input.teamId !== undefined) {
            const team = await this.teamRepository.getById(input.teamId);
            if (!team) {
                throw new Error(`Team with id ${input.teamId} not found`);
            }
            player.team = team;
        }

        if (input.countryId !== undefined) {
            const country = await this.countryRepository.getById(input.countryId);
            if (!country) {
                throw new Error(`Country with id ${input.countryId} not found`);
            }
            player.country = country;
        }

        const updatedPlayer = await this.playerRepository.update(id, player);
        if (!updatedPlayer) {
            throw new Error(`Player with id ${id} could not be updated`);
        }

        return updatedPlayer;
    }
}
