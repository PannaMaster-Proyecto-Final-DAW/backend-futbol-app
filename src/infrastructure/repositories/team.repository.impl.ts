import { Team } from '../../domain/entities/team.entity.js';
import { League } from '../../domain/entities/league.entity.js';
import type { TeamRepository } from '../../domain/repositories/team.domain.repository.js';
import { TeamModel } from '../models/team.model.js';

export class TeamRepositoryImpl implements TeamRepository {
    
    /**
     * Create a new team and persist it to the database.
     */
    async create(team: Team): Promise<Team> {
        const newTeam = await TeamModel.create({
            id: team.id,
            name: team.name,
            leagueId: team.league.id
        });

        const created = await this.getById(newTeam.id);
        if (!created) throw new Error('Error creating team');
        return created;
    }

    /**
     * Update an existing team.
     */
    async update(id: string, team: Team): Promise<Team | null> {
        const updateData: any = {};

        if (team.name) updateData.name = team.name;
        if (team.league?.id) updateData.leagueId = team.league.id;

        const [affectedCount] = await TeamModel.update(updateData, {
            where: { id: id }
        });

        if (affectedCount === 0) return null;

        return this.getById(id);
    }

    /**
     * Delete a team from the database by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await TeamModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    /**
     * Retrieve all teams from the database.
     */
    async getAll(): Promise<Team[]> {
        const models = await TeamModel.findAll();
        return models.map(m => this.toEntity(m));
    }

    /**
     * Find a team by its unique ID.
     */
    async getById(id: string): Promise<Team | null> {
        const model = await TeamModel.findByPk(id);
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Find a team by its name.
     */
    async getByName(name: string): Promise<Team | null> {
        const model = await TeamModel.findOne({ where: { name } });
        if (!model) return null;
        return this.toEntity(model);
    }

    /**
     * Retrieve teams by league ID.
     */
    async getByLeague(leagueId: string): Promise<Team[]> {
        const models = await TeamModel.findAll({ where: { leagueId } });
        return models.map(m => this.toEntity(m));
    }

    /**
     * Map a TeamModel (Sequelize) to a Team domain entity.
     */
    private toEntity(model: TeamModel): Team {
        if (!model) throw new Error('Team model is null');
        
        // If the league association is loaded, use it; otherwise, use the ID.
        const league = model.league 
            ? new League(model.league.id, model.league.name, null as any, null as any, model.league.pictureUrl)
            : new League(model.leagueId, '', null as any, null as any, '');

        return new Team(
            model.id,
            model.name,
            league
        );
    }
}
