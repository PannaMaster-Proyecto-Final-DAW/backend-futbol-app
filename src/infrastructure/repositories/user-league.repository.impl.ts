import { UserLeague } from '../../domain/entities/user-league.entity.js';
import { UserLeagueMembership } from '../../domain/entities/user-league-membership.entity.js';
import type { UserLeagueRepository } from '../../domain/repositories/user-league.domain.repository.js';
import { UserLeagueModel } from '../models/user-league.model.js';

export class UserLeagueRepositoryImpl implements UserLeagueRepository {
    
    async create(userLeague: UserLeague): Promise<UserLeague> {
        const newLeague = await UserLeagueModel.create({
            id: userLeague.id,
            name: userLeague.name,
            inviteCode: userLeague.inviteCode
        });

        const created = await this.getById(newLeague.id);
        if (!created) throw new Error('Error creating user league');
        return created;
    }

    async update(userLeague: UserLeague): Promise<UserLeague> {
        const updateData: any = {};

        if (userLeague.name) updateData.name = userLeague.name;
        if (userLeague.inviteCode) updateData.inviteCode = userLeague.inviteCode;

        const [affectedCount] = await UserLeagueModel.update(updateData, {
            where: { id: userLeague.id }
        });

        if (affectedCount === 0) throw new Error('League not found');

        const updated = await this.getById(userLeague.id);
        if (!updated) throw new Error('League not found');
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await UserLeagueModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async getAll(): Promise<UserLeague[]> {
        const models = await UserLeagueModel.findAll();
        return models.map(m => this.toEntity(m));
    }

    async getById(id: string): Promise<UserLeague | null> {
        const model = await UserLeagueModel.findByPk(id);
        if (!model) return null;
        return this.toEntity(model);
    }

    async getByName(name: string): Promise<UserLeague | null> {
        const model = await UserLeagueModel.findOne({ where: { name } });
        if (!model) return null;
        return this.toEntity(model);
    }

    async getLeagueMembers(leagueId: string): Promise<UserLeagueMembership[]> {
        // Since UserLeagueMembership Sequelize model isn't built yet, we return an empty array.
        // Once the UserLeagueMembershipModel is created, we can query it here:
        // const models = await UserLeagueMembershipModel.findAll({ where: { userLeagueId: leagueId } });
        // return models.map(m => m.toEntity());
        return [];
    }

    private toEntity(model: UserLeagueModel): UserLeague {
        if (!model) throw new Error('UserLeague model is null');
        
        return new UserLeague(
            model.id,
            model.name,
            model.inviteCode,
            [] // Members array
        );
    }
}
