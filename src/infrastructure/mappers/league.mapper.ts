import { League } from "../../domain/entities/league.entity.js";

export class LeagueMapper {
    static toResponse(league: League) {
        return {
            id: league.id,
            name: league.name,
            category: league.category,
            country: league.country?.name || null,
            pictureUrl: league.pictureUrl || null
        };
    }

    static toResponseList(leagues: League[]) {
        return leagues.map(league => this.toResponse(league));
    }
}
