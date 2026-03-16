import type { Request, Response } from 'express';
import { CreateUserLeagueMembershipUseCase } from '../../application/use-cases/user-league-membership/create.use-case.js';
import { UpdateUserLeagueMembershipUseCase } from '../../application/use-cases/user-league-membership/update.use-case.js';
import { DeleteUserLeagueMembershipUseCase } from '../../application/use-cases/user-league-membership/delete.use-case.js';
import { GetUserLeagueMembershipByIdUseCase } from '../../application/use-cases/user-league-membership/get-by-id.use-case.js';
import { GetMembershipByUserAndLeagueUseCase } from '../../application/use-cases/user-league-membership/get-by-user-and-league.use-case.js';
import { GetMembershipsByUserUseCase } from '../../application/use-cases/user-league-membership/get-by-user.use-case.js';
import { GetMembershipsByLeagueUseCase } from '../../application/use-cases/user-league-membership/get-by-league.use-case.js';

export class UserLeagueMembershipController {
    constructor(
        private readonly createUseCase: CreateUserLeagueMembershipUseCase,
        private readonly updateUseCase: UpdateUserLeagueMembershipUseCase,
        private readonly deleteUseCase: DeleteUserLeagueMembershipUseCase,
        private readonly getByIdUseCase: GetUserLeagueMembershipByIdUseCase,
        private readonly getByUserAndLeagueUseCase: GetMembershipByUserAndLeagueUseCase,
        private readonly getByUserUseCase: GetMembershipsByUserUseCase,
        private readonly getByLeagueUseCase: GetMembershipsByLeagueUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUserAndLeague = this.getByUserAndLeague.bind(this);
        this.getByUser = this.getByUser.bind(this);
        this.getByLeague = this.getByLeague.bind(this);
    }

    // Create a new membership
    async create(req: Request, res: Response) {
        try {
            const { userId, leagueId } = req.body;
            if (!userId || !leagueId) {
                res.status(400).json({ error: 'userId and leagueId are required' });
                return;
            }

            const membership = await this.createUseCase.execute({ userId, leagueId });
            res.status(201).json(membership);
        } catch (error: any) {
            console.error(error);
            // Handle known business logic errors gracefully
            if (error.message === 'User not found' || error.message === 'League not found' || error.message === 'User is already a member of this league') {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get a membership by ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const membership = await this.getByIdUseCase.execute(id);
            if (!membership) {
                res.status(404).json({ error: 'Membership not found' });
                return;
            }
            res.status(200).json(membership);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get a membership by user and league
    async getByUserAndLeague(req: Request, res: Response) {
        try {
            const { userId, leagueId } = req.params;
            if (!userId || typeof userId !== 'string' || !leagueId || typeof leagueId !== 'string') {
                res.status(400).json({ error: 'userId and leagueId are required and must be strings' });
                return;
            }
            const membership = await this.getByUserAndLeagueUseCase.execute(userId, leagueId);
            if (!membership) {
                res.status(404).json({ error: 'Membership not found' });
                return;
            }
            res.status(200).json(membership);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get all memberships by user
    async getByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            if (!userId || typeof userId !== 'string') {
                res.status(400).json({ error: 'Invalid userId' });
                return;
            }
            const memberships = await this.getByUserUseCase.execute(userId);
            res.status(200).json(memberships);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get all memberships by league
    async getByLeague(req: Request, res: Response) {
        try {
            const { leagueId } = req.params;
            if (!leagueId || typeof leagueId !== 'string') {
                res.status(400).json({ error: 'Invalid leagueId' });
                return;
            }
            const memberships = await this.getByLeagueUseCase.execute(leagueId);
            res.status(200).json(memberships);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update a membership
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const { score } = req.body;
            if (score === undefined || typeof score !== 'number') {
                res.status(400).json({ error: 'score is required and must be a number' });
                return;
            }

            const membership = await this.updateUseCase.execute({ id, score });
            res.status(200).json(membership);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Membership not found') {
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Delete a membership
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const success = await this.deleteUseCase.execute(id);
            if (!success) {
                res.status(404).json({ error: 'Membership not found or could not be deleted' });
                return;
            }
            res.status(200).json({ message: 'Membership deleted successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
