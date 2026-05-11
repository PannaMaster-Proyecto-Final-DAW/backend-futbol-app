import { Team } from "../../domain/entities/team.entity.js";
import { TeamRepository } from "../../domain/repositories/team.domain.repository.js";

export class InMemoryTeamRepository implements TeamRepository {
    private teams: Team[] = [];

    // Create a new team
    async create(team: Team): Promise<Team> {
        this.teams.push(team);
        return team;
    }

    // Update a team
    async update(id: string, team: Team): Promise<Team | null> {
        const index = this.teams.findIndex(t => t.id === id);
        if (index !== -1) {
            this.teams[index] = team;
            return team;
        }
        return null;
    }

    // Delete a team
    async delete(id: string): Promise<boolean> {
        const index = this.teams.findIndex(t => t.id === id);
        if (index === -1) {
            return false;
        }
        this.teams.splice(index, 1);
        return true;
    }

    // Get all teams
    async getAll(): Promise<Team[]> {
        return [...this.teams];
    }

    // Get team by id
    async getById(id: string): Promise<Team | null> {
        return this.teams.find(t => t.id === id) || null;
    }

    // Get team by name
    async getByName(name: string): Promise<Team | null> {
        return this.teams.find(t => t.name.toLowerCase() === name.toLowerCase()) || null;
    }

    // Get teams by league
    async getByLeague(leagueId: string): Promise<Team[]> {
        return this.teams.filter(t => t.league.id === leagueId);
    }

    // Get teams by tier
    async getByTier(tier: number): Promise<Team[]> {
        return this.teams.filter(t => t.tier === tier);
    }
}
