import { UserLeague } from "../entities/user-league.entity.js";
import { UserLeagueMembership } from "../entities/user-league-membership.entity.js";

export interface UserLeagueRepository {
    // CRUD operations
    create(userLeague: UserLeague): Promise<UserLeague>;
    update(userLeague: UserLeague): Promise<UserLeague>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getById(id: string): Promise<UserLeague | null>;
    getByName(name: string): Promise<UserLeague | null>;
    getAll(): Promise<UserLeague[]>;
    getLeagueMembers(leagueId: string): Promise<UserLeagueMembership[]>;
}
