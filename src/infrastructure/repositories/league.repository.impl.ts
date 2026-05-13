import { League, LeagueCategory } from '../../domain/entities/league.entity.js';
import { Country } from '../../domain/entities/country.entity.js';
import type { LeagueRepository } from '../../domain/repositories/league.domain.repository.js';
import { LeagueModel } from '../models/league.model.js';
import { CacheService } from '../services/cache.service.js';


export class LeagueRepositoryImpl implements LeagueRepository {
    
    constructor(private readonly cacheService?: CacheService) {}


    /**
     * Create a new league and persist it to the database.
     */
    async create(league: League): Promise<League> {
        const newLeague = await LeagueModel.create({
            id: league.id,
            name: league.name,
            countryId: league.country.id,
            category: league.category,
            pictureUrl: league.pictureUrl
        });

        const created = await this.getById(newLeague.id);
        if (!created) throw new Error('Error creating league');
        
        if (this.cacheService) {
            await this.cacheService.del('leagues:all');
        }

        return created;
    }

    /**
     * Update an existing league.

     */
    async update(id: string, league: League): Promise<League | null> {
        const updateData: any = {};

        if (league.name) updateData.name = league.name;
        if (league.country?.id) updateData.countryId = league.country.id;
        if (league.category) updateData.category = league.category;
        if (league.pictureUrl !== undefined) updateData.pictureUrl = league.pictureUrl;

        const [affectedCount] = await LeagueModel.update(updateData, {
            where: { id: id }
        });

        if (affectedCount === 0) return null;

        if (this.cacheService) {
            await this.cacheService.del('leagues:all');
            await this.cacheService.del(`leagues:id:${id}`);
        }

        return this.getById(id);

    }

    /**
     * Delete a league from the database by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await LeagueModel.destroy({ where: { id } });
        
        if (deletedCount > 0 && this.cacheService) {
            await this.cacheService.del('leagues:all');
            await this.cacheService.del(`leagues:id:${id}`);
        }

        return deletedCount > 0;
    }

    /**
     * Retrieve all leagues from the database.

     */
    async getAll(): Promise<League[]> {
        if (!this.cacheService) {
            const models = await LeagueModel.findAll();
            return models.map(m => this.toEntity(m));
        }

        return await this.cacheService.wrap('leagues:all', async () => {
            console.log('[Cache Miss] Fetching all leagues from DB');
            const models = await LeagueModel.findAll();
            return models.map(m => this.toEntity(m));
        });
    }


    /**
     * Find a league by its unique ID.
     */
    async getById(id: string): Promise<League | null> {
        if (!this.cacheService) {
            const model = await LeagueModel.findByPk(id);
            if (!model) return null;
            return this.toEntity(model);
        }

        return await this.cacheService.wrap(`leagues:id:${id}`, async () => {
            console.log(`[Cache Miss] Fetching league ${id} from DB`);
            const model = await LeagueModel.findByPk(id);
            if (!model) return null;
            return this.toEntity(model);
        });
    }


    /**
     * Find a league by its name.
     */
    async getByName(name: string): Promise<League | null> {
        const model = await LeagueModel.findOne({ where: { name } });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Retrieve leagues by country ID.
     */
    async getByCountry(countryId: string): Promise<League[]> {
        const models = await LeagueModel.findAll({ where: { countryId } });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve leagues by category.
     */
    async getByCategory(category: LeagueCategory): Promise<League[]> {
        const models = await LeagueModel.findAll({ where: { category } });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Map a LeagueModel (Sequelize) to a League domain entity.
     */
    private toEntity(model: LeagueModel): League {
        if (!model) throw new Error('League model is null');

        // If the country association is loaded, use it; otherwise, use the ID.
        const country = model.country
            ? new Country(model.country.id, model.country.name, model.country.pictureUrl, model.country.tierMale, model.country.tierFemale)
            : new Country(model.countryId, '', '', 1, 1);

        return new League(
            model.id,
            model.name,
            country,
            model.category as LeagueCategory,
            model.pictureUrl
        );
    }
}
