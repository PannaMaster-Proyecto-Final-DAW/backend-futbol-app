import { UserLeagueMembershipRepository } from '../../domain/repositories/user-league-membership.domain.repository.js';
import { UserLeagueMembership } from '../../domain/entities/user-league-membership.entity.js';

export class InMemoryUserLeagueMembershipRepository implements UserLeagueMembershipRepository {
    private memberships: UserLeagueMembership[] = [];

    // Create a new membership
    async create(membership: UserLeagueMembership): Promise<UserLeagueMembership> {
        this.memberships.push(membership);
        return membership;
    }

    // Update a membership
    async update(membership: UserLeagueMembership): Promise<UserLeagueMembership> {
        const index = this.memberships.findIndex(m => m.id === membership.id);
        if (index !== -1) {
            this.memberships[index] = membership;
            return membership;
        }
        throw new Error('Membership not found for update');
    }

    // Delete a membership
    async delete(id: string): Promise<boolean> {
        const initialLength = this.memberships.length;
        this.memberships = this.memberships.filter(m => m.id !== id);
        return this.memberships.length < initialLength;
    }

    // Get a membership by ID
    async getById(id: string): Promise<UserLeagueMembership | null> {
        return this.memberships.find(m => m.id === id) || null;
    }

    // Get a membership by user and league
    async getByUserIdAndLeagueId(userId: string, leagueId: string): Promise<UserLeagueMembership | null> {
        return this.memberships.find(m => m.user.id === userId && m.league.id === leagueId) || null;
    }

    // Get all memberships by user
    async getByUserId(userId: string): Promise<UserLeagueMembership[]> {
        return this.memberships.filter(m => m.user.id === userId);
    }

    // Get all memberships by league
    async getByLeagueId(leagueId: string): Promise<UserLeagueMembership[]> {
        return this.memberships.filter(m => m.league.id === leagueId);
    }
}
