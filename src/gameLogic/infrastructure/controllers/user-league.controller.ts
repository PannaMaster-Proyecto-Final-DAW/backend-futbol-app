import type { Request, Response } from 'express';
import { CreateUserLeagueUseCase } from '../../application/use-cases/user-league/create.use-case.js';
import { UpdateUserLeagueUseCase } from '../../application/use-cases/user-league/update.use-case.js';
import { DeleteUserLeagueUseCase } from '../../application/use-cases/user-league/delete.use-case.js';
import { GetUserLeagueByIdUseCase } from '../../application/use-cases/user-league/get-by-id.use-case.js';
import { GetUserLeagueByNameUseCase } from '../../application/use-cases/user-league/get-by-name.use-case.js';
import { GetAllUserLeaguesUseCase } from '../../application/use-cases/user-league/get-all.use-case.js';

export class UserLeagueController {
    /**
     * Constructor for UserLeagueController.
     * 
     * @param createUserLeagueUseCase - Use case to create a user league.
     * @param updateUserLeagueUseCase - Use case to update a user league.
     * @param deleteUserLeagueUseCase - Use case to delete a user league.
     * @param getUserLeagueByIdUseCase - Use case to get a user league by ID.
     * @param getUserLeagueByNameUseCase - Use case to get a user league by name.
     * @param getAllUserLeaguesUseCase - Use case to get all user leagues.
     */
    constructor(
        private readonly createUserLeagueUseCase: CreateUserLeagueUseCase,
        private readonly updateUserLeagueUseCase: UpdateUserLeagueUseCase,
        private readonly deleteUserLeagueUseCase: DeleteUserLeagueUseCase,
        private readonly getUserLeagueByIdUseCase: GetUserLeagueByIdUseCase,
        private readonly getUserLeagueByNameUseCase: GetUserLeagueByNameUseCase,
        private readonly getAllUserLeaguesUseCase: GetAllUserLeaguesUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    /**
     * Create a new user league.
     * Expects name in the request body.
     */
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const userLeague = await this.createUserLeagueUseCase.execute({ name });
            res.status(201).json(userLeague);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }

    /**
     * Get all user leagues.
     */
    async getAll(req: Request, res: Response) {
        try {
            const userLeagues = await this.getAllUserLeaguesUseCase.execute();
            res.status(200).json(userLeagues);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Get a user league by ID.
     * Expects 'id' in the route parameters.
     */
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const userLeague = await this.getUserLeagueByIdUseCase.execute(id);
            if (!userLeague) {
                res.status(404).json({ error: 'User League not found' });
                return;
            }
            res.status(200).json(userLeague);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Get a user league by name.
     * Expects 'name' in the route parameters.
     */
    async getByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid Name' });
                return;
            }
            const userLeague = await this.getUserLeagueByNameUseCase.execute(name);
            if (!userLeague) {
                res.status(404).json({ error: 'User League not found' });
                return;
            }
            res.status(200).json(userLeague);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Update an existing user league.
     * Expects 'id' in route parameters and fields to update in body.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const { name } = req.body;
            const userLeague = await this.updateUserLeagueUseCase.execute(id, { name });
            res.status(200).json(userLeague);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }

    /**
     * Delete a user league by ID.
     * Expects 'id' in the route parameters.
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const success = await this.deleteUserLeagueUseCase.execute(id);
            if (!success) {
                res.status(404).json({ error: 'User League not found or could not be deleted' });
                return;
            }
            res.status(200).json({ message: 'User League deleted successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
