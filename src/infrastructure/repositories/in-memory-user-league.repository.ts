import { UserLeague } from "../../domain/entities/user-league.entity.js";
import { UserLeagueMembership } from "../../domain/entities/user-league-membership.entity.js";
import { UserLeagueRepository } from "../../domain/repositories/user-league.domain.repository.js";

export class InMemoryUserLeagueRepository implements UserLeagueRepository {
    private userLeagues: UserLeague[] = [];

    async create(userLeague: UserLeague): Promise<UserLeague> {
        this.userLeagues.push(userLeague);
        return userLeague;
    }

    async update(userLeague: UserLeague): Promise<UserLeague> {
        const index = this.userLeagues.findIndex(ul => ul.id === userLeague.id);
        if (index === -1) {
            throw new Error('League not found');
        }
        this.userLeagues[index] = userLeague;
        return userLeague;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.userLeagues.findIndex(ul => ul.id === id);
        if (index === -1) {
            throw new Error('League not found');
        }
        this.userLeagues.splice(index, 1);
        return true;
    }

    async getById(id: string): Promise<UserLeague | null> {
        return this.userLeagues.find(ul => ul.id === id) || null;
    }

    async getByName(name: string): Promise<UserLeague | null> {
        return this.userLeagues.find(ul => ul.name === name) || null;
    }

    async getAll(): Promise<UserLeague[]> {
        return this.userLeagues;
    }

    async getLeagueMembers(leagueId: string): Promise<UserLeagueMembership[]> {
        const league = this.userLeagues.find(ul => ul.id === leagueId);
        if (!league) {
            throw new Error('League not found');
        }
        return league.members;
    }
}

