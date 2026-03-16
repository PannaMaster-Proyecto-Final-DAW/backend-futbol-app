import type { Team } from "../entities/team.entity.js";

export interface TeamRepository {
    // CRUD operations
    create(team: Team): Promise<Team>;
    update(id: string, team: Team): Promise<Team | null>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getAll(): Promise<Team[]>;
    getById(id: string): Promise<Team | null>;
    getByName(name: string): Promise<Team | null>;
    getByLeague(leagueId: string): Promise<Team[]>;
}
