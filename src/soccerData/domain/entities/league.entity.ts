import { CountryEntity } from "./country.entity.js";

export enum LeagueCategory {
    MALE = 'male',
    FEMALE = 'female'
}

export class LeagueEntity {
    constructor(
        public id: string, // UUID
        public name: string,
        public country: CountryEntity, // Ref Country
        public category: LeagueCategory,
    ) { }
}
