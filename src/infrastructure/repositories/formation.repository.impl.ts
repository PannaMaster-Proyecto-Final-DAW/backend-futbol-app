import { Formation } from '../../domain/entities/formation.entity.js';
import { PlayerPosition } from '../../domain/entities/player.entity.js';
import type { FormationRepository } from '../../domain/repositories/formation.domain.repository.js';
import { FormationModel } from '../models/formation.model.js';
import { CacheService } from '../services/cache.service.js';


export class FormationRepositoryImpl implements FormationRepository {
    
    constructor(private readonly cacheService?: CacheService) {}

    /**
     * Creates a new formation and persists it to the database.
     * Re-fetches the record after creation to include all DB-generated values.
     */
    async create(formation: Formation): Promise<Formation> {
        await FormationModel.create({
            id: formation.id,
            name: formation.name,
            goalkeeper: formation.goalkeeper,
            defenders: formation.defenders,
            midfielders: formation.midfielders,
            forwards: formation.forwards,
        });

        const created = await this.getById(formation.id);
        if (!created) throw new Error('Error creating formation');
        
        if (this.cacheService) {
            await this.cacheService.del('formations:all');
        }

        return created;
    }

    /**
     * Partially updates an existing formation.

     * Returns null if no row was affected (formation not found).
     */
    async update(id: string, formation: Partial<Formation>): Promise<Formation | null> {
        const updateData: Partial<{
            name: string;
            goalkeeper: string;
            defenders: string[];
            midfielders: string[];
            forwards: string[];
        }> = {};

        if (formation.name !== undefined)        updateData.name        = formation.name;
        if (formation.goalkeeper !== undefined)  updateData.goalkeeper  = formation.goalkeeper;
        if (formation.defenders !== undefined)   updateData.defenders   = formation.defenders;
        if (formation.midfielders !== undefined) updateData.midfielders = formation.midfielders;
        if (formation.forwards !== undefined)    updateData.forwards    = formation.forwards;

        const [affectedCount] = await FormationModel.update(updateData, {
            where: { id },
        });

        if (affectedCount === 0) return null;

        if (this.cacheService) {
            await this.cacheService.del('formations:all');
            await this.cacheService.del(`formations:id:${id}`);
        }

        return this.getById(id);
    }

    /**
     * Deletes a formation by its ID.


     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await FormationModel.destroy({ where: { id } });
        
        if (deletedCount > 0 && this.cacheService) {
            await this.cacheService.del('formations:all');
            await this.cacheService.del(`formations:id:${id}`);
        }

        return deletedCount > 0;
    }

    /**
     * Retrieves all formations from the database.

     */
    async getAll(): Promise<Formation[]> {
        if (!this.cacheService) {
            const models = await FormationModel.findAll();
            return models.map(m => this.toEntity(m));
        }

        return await this.cacheService.wrap('formations:all', async () => {
            console.log('[Cache Miss] Fetching all formations from DB');
            const models = await FormationModel.findAll();
            return models.map(m => this.toEntity(m));
        });
    }


    /**
     * Finds a formation by its unique ID.
     */
    async getById(id: string): Promise<Formation | null> {
        if (!this.cacheService) {
            const model = await FormationModel.findByPk(id);
            if (!model) return null;
            return this.toEntity(model);
        }

        return await this.cacheService.wrap(`formations:id:${id}`, async () => {
            console.log(`[Cache Miss] Fetching formation ${id} from DB`);
            const model = await FormationModel.findByPk(id);
            if (!model) return null;
            return this.toEntity(model);
        });
    }


    /**
     * Finds a formation by its name (case-sensitive).
     */
    async getByName(name: string): Promise<Formation | null> {
        const model = await FormationModel.findOne({ where: { name } });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Maps a FormationModel (Sequelize) to the Formation domain entity.
     * Casts stored strings back to PlayerPosition enum values.
     */
    private toEntity(model: FormationModel): Formation {
        return new Formation(
            model.id,
            model.name,
            model.goalkeeper as PlayerPosition,
            model.defenders   as PlayerPosition[],
            model.midfielders as PlayerPosition[],
            model.forwards    as PlayerPosition[],
        );
    }
}
