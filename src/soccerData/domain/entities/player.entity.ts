import { CountryEntity } from "./country.entity.js";
import { TeamEntity } from "./team.entity.js";

export enum PlayerPosition {
    // Goalkeeper
    GK = 'GK',

    // Defender
    LB = 'LB',
    RB = 'RB',
    CB = 'CB',

    // Midfielder
    LM = 'LM',
    RM = 'RM',
    CM = 'CM',
    CDM = 'CDM',
    CAM = 'CAM',

    // Forward
    LW = 'LW',
    RW = 'RW',
    CF = 'CF',
    ST = 'ST'
}

export class PlayerEntity {
    constructor(
        public id: string, // UUID
        public name: string,
        public position: PlayerPosition[],
        public team: TeamEntity, // Ref Team
        public country: CountryEntity, // Ref Country
    ) { }
}

