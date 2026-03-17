import { League, LeagueCategory } from '../../domain/entities/league.entity.js';
import { Country } from '../../domain/entities/country.entity.js';
import type { LeagueRepository } from '../../domain/repositories/league.domain.repository.js';
import { LeagueModel } from '../models/league.model.js';

export class LeagueRepositoryImpl implements LeagueRepository {
    
    /**
     * Create a new league and persist it to the database.
     */
    async create(league: League): Promise<League> {
        const newLeague = await LeagueModel.create({
            id: league.id,
            name: league.name,
            countryId: league.country.id,
            category: league.category
        });

        const created = await this.getById(newLeague.id);
        if (!created) throw new Error('Error creating league');
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

        const [affectedCount] = await LeagueModel.update(updateData, {
            where: { id: id }
        });

        if (affectedCount === 0) return null;

        return this.getById(id);
    }

    /**
     * Delete a league from the database by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await LeagueModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    /**
     * Retrieve all leagues from the database.
     */
    async getAll(): Promise<League[]> {
        const models = await LeagueModel.findAll();
        return models.map(m => this.toEntity(m));
    }

    /**
     * Find a league by its unique ID.
     */
    async getById(id: string): Promise<League | null> {
        const model = await LeagueModel.findByPk(id);
        if (!model) return null;
        return this.toEntity(model);
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
        
        // Since we are keeping it simple without formal Country association in the model,
        // we reconstruct the Country entity with just the ID and an empty name for now.
        // This maintains compatibility with the League entity constructor.
        const country = new Country(model.countryId, ''); 

        return new League(
            model.id,
            model.name,
            country,
            model.category as LeagueCategory
        );
    }
}
