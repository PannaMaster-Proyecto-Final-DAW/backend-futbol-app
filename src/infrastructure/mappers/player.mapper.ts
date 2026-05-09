import { Player, GeneralPosition } from "../../domain/entities/player.entity.js";

export class PlayerMapper {
    static toResponse(player: Player) {
        return {
            id: player.id,
            name: player.name,
            age: player.age,
            tier: player.tier,
            team: player.team?.name || null,
            league: player.team?.league?.name || null,
            nationality: player.country?.name || null,
            position: player.position,
            generalPosition: player.generalPosition,
            pictureUrl: player.pictureUrl || null,
            gender: player.gender
        };
    }

    static toResponseList(players: Player[]) {
        return players.map(player => this.toResponse(player));
    }
}
