import { Player, PlayerPosition } from '../../domain/entities/player.entity.js';
import { Team } from '../../domain/entities/team.entity.js';
import { Country } from '../../domain/entities/country.entity.js';
import type { PlayerRepository } from '../../domain/repositories/player.domain.repository.js';
import { PlayerModel } from '../models/player.model.js';
import { TeamModel } from '../models/team.model.js';
import { CountryModel } from '../models/country.model.js';
import { Op } from 'sequelize';

export class PlayerRepositoryImpl implements PlayerRepository {
    
    /**
     * Create a new player and persist it to the database.
     */
    async create(player: Player): Promise<Player> {
        const newPlayer = await PlayerModel.create({
            id: player.id,
            name: player.name,
            position: player.position,
            teamId: player.team.id,
            countryId: player.country.id,
            pictureUrl: player.pictureUrl
        });

        const created = await this.getById(newPlayer.id);
        if (!created) throw new Error('Error creating player');
        return created;
    }

    /**
     * Update an existing player.
     */
    async update(id: string, player: Player): Promise<Player | null> {
        const updateData: any = {};

        if (player.name) updateData.name = player.name;
        if (player.position) updateData.position = player.position;
        if (player.team?.id) updateData.teamId = player.team.id;
        if (player.country?.id) updateData.countryId = player.country.id;
        if (player.pictureUrl !== undefined) updateData.pictureUrl = player.pictureUrl;

        const [affectedCount] = await PlayerModel.update(updateData, {
            where: { id }
        });

        if (affectedCount === 0) return null;

        return this.getById(id);
    }

    /**
     * Delete a player from the database by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await PlayerModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    /**
     * Retrieve all players from the database.
     */
    async getAll(): Promise<Player[]> {
        const models = await PlayerModel.findAll({ include: [TeamModel, CountryModel] });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Find a player by its unique ID.
     */
    async getById(id: string): Promise<Player | null> {
        const model = await PlayerModel.findByPk(id, { include: [TeamModel, CountryModel] });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Find a player by its name.
     */
    async getByName(name: string): Promise<Player | null> {
        const model = await PlayerModel.findOne({ 
            where: { name }, 
            include: [TeamModel, CountryModel] 
        });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Retrieve players by team ID.
     */
    async getByTeam(teamId: string): Promise<Player[]> {
        const models = await PlayerModel.findAll({ 
            where: { teamId }, 
            include: [TeamModel, CountryModel] 
        });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve players by country ID.
     */
    async getByCountry(countryId: string): Promise<Player[]> {
        const models = await PlayerModel.findAll({ 
            where: { countryId }, 
            include: [TeamModel, CountryModel] 
        });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve players by position.
     */
    async getByPosition(position: PlayerPosition): Promise<Player[]> {
        const models = await PlayerModel.findAll({ 
            where: { 
                position: { 
                    [Op.overlap]: [position] 
                } 
            }, 
            include: [TeamModel, CountryModel] 
        });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve players by team ID and position.
     */
    async getByTeamAndPosition(teamId: string, position: PlayerPosition): Promise<Player[]> {
        const models = await PlayerModel.findAll({
            where: {
                teamId,
                position: { [Op.overlap]: [position] }
            },
            include: [TeamModel, CountryModel]
        });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve players by team ID and country ID.
     */
    async getByTeamAndCountry(teamId: string, countryId: string): Promise<Player[]> {
        const models = await PlayerModel.findAll({
            where: { teamId, countryId },
            include: [TeamModel, CountryModel]
        });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Retrieve players by team ID, country ID, and position.
     */
    async getByTeamAndCountryAndPosition(teamId: string, countryId: string, position: PlayerPosition): Promise<Player[]> {
        const models = await PlayerModel.findAll({
            where: {
                teamId,
                countryId,
                position: { [Op.overlap]: [position] }
            },
            include: [TeamModel, CountryModel]
        });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Map a PlayerModel (Sequelize) to a Player domain entity.
     */
    private toEntity(model: PlayerModel): Player {
        if (!model) throw new Error('Player model is null');

        const team = model.team 
            ? new Team(model.team.id, model.team.name, null as any, model.team.pictureUrl)
            : new Team(model.teamId, '', null as any, '');

        const country = model.country 
            ? new Country(model.country.id, model.country.name, model.country.pictureUrl)
            : new Country(model.countryId, '', '');

        return new Player(
            model.id,
            model.name,
            model.position as PlayerPosition[],
            team,
            country,
            model.pictureUrl
        );
    }
}
