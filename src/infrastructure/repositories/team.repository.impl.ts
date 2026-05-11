import { Team } from '../../domain/entities/team.entity.js';
import { League } from '../../domain/entities/league.entity.js';
import type { TeamRepository } from '../../domain/repositories/team.domain.repository.js';
import { TeamModel } from '../models/team.model.js';
import { LeagueModel } from '../models/league.model.js';
import { CacheService } from '../services/cache.service.js';


export class TeamRepositoryImpl implements TeamRepository {
    
    constructor(private readonly cacheService?: CacheService) {}

    
    /**
     * Create a new team and persist it to the database.
     */
    async create(team: Team): Promise<Team> {
        const newTeam = await TeamModel.create({
            id: team.id,
            name: team.name,
            leagueId: team.league.id,
            pictureUrl: team.pictureUrl,
            tier: team.tier
        });

        const created = await this.getById(newTeam.id);
        if (!created) throw new Error('Error creating team');
        
        if (this.cacheService) {
            await this.cacheService.del('teams:all');
        }

        return created;
    }

    /**
     * Update an existing team.

     */
    async update(id: string, team: Team): Promise<Team | null> {
        const updateData: any = {};

        if (team.name) updateData.name = team.name;
        if (team.league?.id) updateData.leagueId = team.league.id;
        if (team.pictureUrl !== undefined) updateData.pictureUrl = team.pictureUrl;
        if (team.tier !== undefined) updateData.tier = team.tier;

        const [affectedCount] = await TeamModel.update(updateData, {
            where: { id: id }
        });

        if (affectedCount === 0) return null;

        if (this.cacheService) {
            await this.cacheService.del('teams:all');
            await this.cacheService.del(`teams:id:${id}`);
        }

        return this.getById(id);

    }

    /**
     * Delete a team from the database by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await TeamModel.destroy({ where: { id } });
        
        if (deletedCount > 0 && this.cacheService) {
            await this.cacheService.del('teams:all');
            await this.cacheService.del(`teams:id:${id}`);
        }

        return deletedCount > 0;
    }

    /**
     * Retrieve all teams from the database.

     */
    async getAll(): Promise<Team[]> {
        if (!this.cacheService) {
            const models = await TeamModel.findAll({ include: [LeagueModel] });
            return models.map(m => this.toEntity(m));
        }

        return await this.cacheService.wrap('teams:all', async () => {
            console.log('[Cache Miss] Fetching all teams from DB');
            const models = await TeamModel.findAll({ include: [LeagueModel] });
            return models.map(m => this.toEntity(m));
        }, 3600000); // 1 hour cache
    }


    /**
     * Find a team by its unique ID.
     */
    async getById(id: string): Promise<Team | null> {
        if (!this.cacheService) {
            const model = await TeamModel.findByPk(id, { include: [LeagueModel] });
            if (!model) return null;
            return this.toEntity(model);
        }

        return await this.cacheService.wrap(`teams:id:${id}`, async () => {
            console.log(`[Cache Miss] Fetching team ${id} from DB`);
            const model = await TeamModel.findByPk(id, { include: [LeagueModel] });
            if (!model) return null;
            return this.toEntity(model);
        }, 3600000); // 1 hour cache
    }


    /**
     * Find a team by its name.
     */
    async getByName(name: string): Promise<Team | null> {
        const model = await TeamModel.findOne({ where: { name }, include: [LeagueModel] });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Retrieve teams by league ID.
     */
    async getByLeague(leagueId: string): Promise<Team[]> {
        const models = await TeamModel.findAll({ where: { leagueId }, include: [LeagueModel] });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve teams by tier.
     */
    async getByTier(tier: number): Promise<Team[]> {
        const models = await TeamModel.findAll({ where: { tier }, include: [LeagueModel] });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Map a TeamModel (Sequelize) to a Team domain entity.
     */
    private toEntity(model: TeamModel): Team {
        if (!model) throw new Error('Team model is null');
        
        // If the league association is loaded, use it; otherwise, use the ID.
        const league = model.league 
            ? new League(model.league.id, model.league.name, null as any, model.league.category, model.league.pictureUrl)
            : new League(model.leagueId, '', null as any, null as any, '');

        return new Team(
            model.id,
            model.name,
            league,
            model.pictureUrl,
            model.tier
        );
    }
}
