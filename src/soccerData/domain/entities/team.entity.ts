import { LeagueEntity } from "./league.entity.js";

export class TeamEntity {
    constructor(
        public id: string, // UUID
        public name: string,
        public league: LeagueEntity, // Ref League
    ) { }
}
