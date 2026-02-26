import { CountryEntity } from "./country.entity.js";
import { TeamEntity } from "./team.entity.js";

export enum PlayerPosition {
    GK = 'GK',
    DEF = 'DEF',
    MID = 'MID',
    FWD = 'FWD'
}

export class PlayerEntity {
    constructor(
        public id: string, // UUID
        public name: string,
        public position: PlayerPosition,
        public team: TeamEntity, // Ref Team
        public country: CountryEntity, // Ref Country
    ) { }
}
