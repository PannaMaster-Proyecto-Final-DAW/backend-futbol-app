import { Player, PlayerGender } from "../../../domain/entities/player.entity.js";
import type { PlayerRepository } from "../../../domain/repositories/player.domain.repository.js";

export interface GetPlayersByGenderInput {
    gender: PlayerGender;
}

export class GetPlayersByGenderUseCase {
    constructor(
        private readonly playerRepository: PlayerRepository
    ) { }

    async execute(input: GetPlayersByGenderInput): Promise<Player[]> {
        return this.playerRepository.getByGender(input.gender);
    }
}
