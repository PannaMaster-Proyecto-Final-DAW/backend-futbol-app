import { Country } from "./country.entity.js";

export enum LeagueCategory {
    MALE = 'male',
    FEMALE = 'female'
}

export class League {
    constructor(
        public id: string, // UUID
        public name: string,
        public country: Country, // Ref Country
        public category: LeagueCategory,
        public pictureUrl: string,
    ) { }
}
