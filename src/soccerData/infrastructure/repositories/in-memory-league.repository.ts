import { League, LeagueCategory } from "../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../domain/repositories/league.domain.repository.js";

export class InMemoryLeagueRepository implements LeagueRepository {
    private leagues: League[] = [];

    // Create a new league
    async create(league: League): Promise<League> {
        this.leagues.push(league);
        return league;
    }

    // Update a league
    async update(id: string, league: League): Promise<League | null> {
        const index = this.leagues.findIndex(l => l.id === id);
        if (index !== -1) {
            this.leagues[index] = league;
            return league;
        }
        return null;
    }

    // Delete a league
    async delete(id: string): Promise<boolean> {
        const index = this.leagues.findIndex(l => l.id === id);
        if (index === -1) {
            return false;
        }
        this.leagues.splice(index, 1);
        return true;
    }

    // Get all leagues
    async getAll(): Promise<League[]> {
        return [...this.leagues];
    }

    // Get league by id
    async getById(id: string): Promise<League | null> {
        return this.leagues.find(l => l.id === id) || null;
    }

    // Get league by name
    async getByName(name: string): Promise<League | null> {
        return this.leagues.find(l => l.name.toLowerCase() === name.toLowerCase()) || null;
    }

    // Get leagues by country
    async getByCountry(countryId: string): Promise<League[]> {
        return this.leagues.filter(l => l.country.id === countryId);
    }

    // Get leagues by category
    async getByCategory(category: LeagueCategory): Promise<League[]> {
        return this.leagues.filter(l => l.category === category);
    }
}
