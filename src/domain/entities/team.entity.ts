import { League } from "./league.entity.js";

export class Team {
    constructor(
        public id: string, // UUID
        public name: string,
        public league: League, // Ref League
        public pictureUrl: string,
        public tier: number, // 1 = easy, 2 = medium, 3 = hard
    ) { }
}
