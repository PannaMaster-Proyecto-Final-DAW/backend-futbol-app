import { UserLeagueMembership } from "../entities/user-league-membership.entity.js";

export interface UserLeagueMembershipRepository {
    // CRUD operations
    create(userLeagueMembership: UserLeagueMembership): Promise<UserLeagueMembership>;
    update(userLeagueMembership: UserLeagueMembership): Promise<UserLeagueMembership>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getById(id: string): Promise<UserLeagueMembership | null>;
    getByUserIdAndLeagueId(userId: string, leagueId: string): Promise<UserLeagueMembership | null>;
    getByUserId(userId: string): Promise<UserLeagueMembership[]>;
    getByLeagueId(leagueId: string): Promise<UserLeagueMembership[]>;
}
