import { League } from "./league.entity.js";

export class Team {
    constructor(
        public id: string, // UUID
        public name: string,
        public league: League, // Ref League
        public pictureUrl: string,
    ) { }
}
