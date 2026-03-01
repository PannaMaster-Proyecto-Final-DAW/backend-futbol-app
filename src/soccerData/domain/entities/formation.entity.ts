import { PlayerPosition } from "./player.entity.js";

export class FormationEntity {
    constructor(
        public id: string, // UUID
        public name: string,
        public goalkeeper: PlayerPosition = PlayerPosition.GK,
        public defenders: PlayerPosition[],
        public midfielders: PlayerPosition[],
        public forwards: PlayerPosition[],
    ) { }
}