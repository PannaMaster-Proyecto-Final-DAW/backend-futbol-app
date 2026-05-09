import { Team } from "../../domain/entities/team.entity.js";

export class TeamMapper {
    static toResponse(team: Team) {
        return {
            id: team.id,
            name: team.name,
            tier: team.tier,
            pictureUrl: team.pictureUrl || null,
            league: team.league?.name || null,
            gender: team.league?.category || null,
            country: team.league?.country?.name || null
        };
    }

    static toResponseList(teams: Team[]) {
        return teams.map(team => this.toResponse(team));
    }
}
