import { UserLeagueMembership } from '../../domain/entities/user-league-membership.entity.js';
import { User } from '../../domain/entities/user.entity.js';
import { UserLeague } from '../../domain/entities/user-league.entity.js';
import type { UserLeagueMembershipRepository } from '../../domain/repositories/user-league-membership.domain.repository.js';
import { UserLeagueMembershipModel } from '../models/user-league-membership.model.js';

export class UserLeagueMembershipRepositoryImpl implements UserLeagueMembershipRepository {
    async create(membership: UserLeagueMembership): Promise<UserLeagueMembership> {
        const newMembership = await UserLeagueMembershipModel.create({
            id: membership.id,
            userId: membership.user.id,
            userLeagueId: membership.league.id,
            score: membership.score
        });

        const created = await this.getById(newMembership.id);
        if (!created) throw new Error('Error creating user league membership');
        return created;
    }

    async update(membership: UserLeagueMembership): Promise<UserLeagueMembership> {
        const updateData: any = {};
        if (membership.score !== undefined) updateData.score = membership.score;

        const [affectedCount] = await UserLeagueMembershipModel.update(updateData, {
            where: { id: membership.id }
        });

        if (affectedCount === 0) throw new Error('Membership not found');

        const updated = await this.getById(membership.id);
        if (!updated) throw new Error('Membership not found');
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await UserLeagueMembershipModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async getById(id: string): Promise<UserLeagueMembership | null> {
        const model = await UserLeagueMembershipModel.findByPk(id, {
            include: ['league', 'user']
        });
        if (!model) return null;
        return this.toEntity(model);
    }

    async getByUserIdAndLeagueId(userId: string, leagueId: string): Promise<UserLeagueMembership | null> {
        const model = await UserLeagueMembershipModel.findOne({
            where: { userId, userLeagueId: leagueId },
            include: ['league', 'user']
        });
        if (!model) return null;
        return this.toEntity(model);
    }

    async getByUserId(userId: string): Promise<UserLeagueMembership[]> {
        const models = await UserLeagueMembershipModel.findAll({ 
            where: { userId },
            include: ['league', 'user']
        });
        return models.map(m => this.toEntity(m));
    }

    async getByLeagueId(leagueId: string): Promise<UserLeagueMembership[]> {
        const models = await UserLeagueMembershipModel.findAll({ 
            where: { userLeagueId: leagueId },
            include: ['league', 'user']
        });
        return models.map(m => this.toEntity(m));
    }

    async incrementScore(userId: string, leagueId: string, score: number): Promise<UserLeagueMembership> {
        const model = await UserLeagueMembershipModel.findOne({
            where: { userId, userLeagueId: leagueId }
        });

        if (!model) throw new Error('Membership not found');

        await model.increment('score', { by: score });
        await model.reload({
            include: ['league', 'user']
        });

        return this.toEntity(model);
    }

    private toEntity(model: UserLeagueMembershipModel): UserLeagueMembership {
        if (!model) throw new Error('UserLeagueMembership model is null');

        const user = model.user
            ? new User(model.user.id, model.user.userName, model.user.email, model.user.password, model.user.role as any)
            : new User(model.userId, '', '', '', '' as any);

        const league = model.league
            ? new UserLeague(model.league.id, model.league.name, model.league.inviteCode, [])
            : new UserLeague(model.userLeagueId, '', '', []);

        return new UserLeagueMembership(
            model.id,
            user,
            league,
            model.score,
            (model as any).createdAt // Sequelize dynamic field
        );
    }
}
