import type { League, LeagueCategory } from "../entities/league.entity.js";

export interface LeagueRepository {
    // CRUD operations
    create(league: League): Promise<League>;
    update(id: string, league: League): Promise<League | null>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getAll(): Promise<League[]>;
    getById(id: string): Promise<League | null>;
    getByName(name: string): Promise<League | null>;
    getByCountry(countryId: string): Promise<League[]>;
    getByCategory(category: LeagueCategory): Promise<League[]>;
}
