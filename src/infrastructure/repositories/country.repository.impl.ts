import { Country } from '../../domain/entities/country.entity.js';
import type { CountryRepository } from '../../domain/repositories/country.domain.repository.js';
import { CountryModel } from '../models/country.model.js';
import { CacheService } from '../services/cache.service.js';


export class CountryRepositoryImpl implements CountryRepository {
    
    constructor(private readonly cacheService?: CacheService) {}

    /**
     * Create a new country and persist it to the database.
     * Re-fetches the country from the database after creation to ensure all
     * database-generated values and associations are included.
     */
    async create(country: Country): Promise<Country> {
        const newCountry = await CountryModel.create({
            id: country.id,
            name: country.name,
            pictureUrl: country.pictureUrl,
            tierMale: country.tierMale,
            tierFemale: country.tierFemale
        });

        const created = await this.getById(newCountry.id);
        if (!created) throw new Error('Error creating country');
        
        if (this.cacheService) {
            await this.cacheService.del('countries:all');
        }

        return created;
    }

    /**
     * Update an existing country.

     * Performs a partial update and returns the fully reconstructed entity.
     */
    async update(country: Country): Promise<Country> {
        const updateData: any = {};

        //Verify which fields are going to be updated
        if (country.name) updateData.name = country.name;
        if (country.pictureUrl !== undefined) updateData.pictureUrl = country.pictureUrl;
        if (country.tierMale !== undefined) updateData.tierMale = country.tierMale;
        if (country.tierFemale !== undefined) updateData.tierFemale = country.tierFemale;

        // affectedCount is the number of rows affected by the update
        const [affectedCount] = await CountryModel.update(updateData, {
            where: { id: country.id }
        });

        if (affectedCount === 0) {
            throw new Error('Country not found');
        }

        const updated = await this.getById(country.id);
        if (!updated) throw new Error('Country not found after update');

        if (this.cacheService) {
            await this.cacheService.del('countries:all');
            await this.cacheService.del(`countries:id:${country.id}`);
        }

        return updated;
    }

    /**
     * Delete a country from the database by its ID.

     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await CountryModel.destroy({ where: { id } });
        
        if (deletedCount > 0 && this.cacheService) {
            await this.cacheService.del('countries:all');
            await this.cacheService.del(`countries:id:${id}`);
        }

        return deletedCount > 0;
    }

    /**
     * Retrieve all countries from the database.

     */
    async getAll(): Promise<Country[]> {
        if (!this.cacheService) {
            const models = await CountryModel.findAll();
            return models.map(m => this.toEntity(m));
        }

        return await this.cacheService.wrap('countries:all', async () => {
            console.log('[Cache Miss] Fetching all countries from DB');
            const models = await CountryModel.findAll();
            return models.map(m => this.toEntity(m));
        }, 86400000); // 24 hours cache for countries
    }


    /**
     * Find a country by its unique ID.
     */
    async getById(id: string): Promise<Country | null> {
        if (!this.cacheService) {
            const model = await CountryModel.findByPk(id);
            if (!model) return null;
            return this.toEntity(model);
        }

        return await this.cacheService.wrap(`countries:id:${id}`, async () => {
            console.log(`[Cache Miss] Fetching country ${id} from DB`);
            const model = await CountryModel.findByPk(id);
            if (!model) return null;
            return this.toEntity(model);
        }, 86400000); // 24 hours cache
    }


    /**
     * Find a country by its name.
     */
    async getByName(name: string): Promise<Country | null> {
        const model = await CountryModel.findOne({ where: { name } });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Retrieve countries by tier and category.
     */
    async getByTier(tier: number, category: 'male' | 'female'): Promise<Country[]> {
        const column = category === 'male' ? 'tierMale' : 'tierFemale';
        const models = await CountryModel.findAll({ where: { [column]: tier } });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Map a CountryModel (Sequelize) to a Country domain entity.
     */
    private toEntity(model: CountryModel): Country {
        if (!model) throw new Error('Country model is null');
        return new Country(
            model.id,
            model.name,
            model.pictureUrl,
            model.tierMale,
            model.tierFemale
        );
    }
}
