import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";
import { Player, PlayerPosition, PlayerGender, GeneralPosition } from "../../../domain/entities/player.entity.js";
import type { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";
import type { CountryRepository } from "../../../domain/repositories/country.domain.repository.js";
import { updatePlayerSchema } from "../../../infrastructure/validation/schemas/player.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

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
    generalPosition?: GeneralPosition;
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
        const validatedInput = validateData(updatePlayerSchema, input);

        const player = await this.playerRepository.getById(id);
        if (!player) {
            throw new Error(`Player with id ${id} not found`);
        }

        // We use strict check ( !== undefined ) to allow updates to falsy values
        if (validatedInput.name !== undefined) player.name = validatedInput.name;
        if (validatedInput.age !== undefined) player.age = validatedInput.age;
        if (validatedInput.birthdate !== undefined) player.birthdate = validatedInput.birthdate;
        if (validatedInput.position !== undefined) player.position = validatedInput.position;
        if (validatedInput.pictureUrl !== undefined) player.pictureUrl = validatedInput.pictureUrl;
        if (validatedInput.tier !== undefined) player.tier = validatedInput.tier;
        if (validatedInput.gender !== undefined) player.gender = validatedInput.gender;
        if (validatedInput.generalPosition !== undefined) player.generalPosition = validatedInput.generalPosition;

        if (validatedInput.teamId !== undefined) {
            const team = await this.teamRepository.getById(validatedInput.teamId);
            if (!team) {
                throw new Error(`Team with id ${validatedInput.teamId} not found`);
            }
            player.team = team;
        }

        if (validatedInput.countryId !== undefined) {
            const country = await this.countryRepository.getById(validatedInput.countryId);
            if (!country) {
                throw new Error(`Country with id ${validatedInput.countryId} not found`);
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
