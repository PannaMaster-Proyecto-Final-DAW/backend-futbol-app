import type { Request, Response } from 'express';
import { SaveUserGameAttemptUseCase } from '../../application/use-cases/user-game-attempt/save.use-case.js';
import { GetUserGameAttemptByDateUseCase } from '../../application/use-cases/user-game-attempt/get-by-user-and-date.use-case.js';
import { DeleteOlderUserGameAttemptsUseCase } from '../../application/use-cases/user-game-attempt/delete-older-than.use-case.js';

export class UserGameAttemptController {
    constructor(
        private readonly saveUseCase: SaveUserGameAttemptUseCase,
        private readonly getByUserAndDateUseCase: GetUserGameAttemptByDateUseCase,
        private readonly deleteOlderThanUseCase: DeleteOlderUserGameAttemptsUseCase
    ) {
        this.save = this.save.bind(this);
        this.getByUserAndDate = this.getByUserAndDate.bind(this);
        this.deleteOlderThan = this.deleteOlderThan.bind(this);
    }

    async save(req: Request, res: Response) {
        try {
            const data = req.body;
            const attempt = await this.saveUseCase.execute(data);
            res.status(200).json(attempt);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || 'Bad Request' });
        }
    }

    async getByUserAndDate(req: Request, res: Response) {
        try {
            const userId = req.params.userId as string;
            const date = req.params.date as string;
            const gameId = req.params.gameId as string;
            
            if (!userId || !date || !gameId) {
                res.status(400).json({ error: 'Missing parameters: userId, date, and gameId are required' });
                return;
            }

            const attempt = await this.getByUserAndDateUseCase.execute(userId, gameId, date);
            
            if (!attempt) {
                res.status(404).json({ error: 'Attempt not found' });
                return;
            }

            res.status(200).json(attempt);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteOlderThan(req: Request, res: Response) {
        try {
            const { date } = req.params;
            
            if (!date) {
                res.status(400).json({ error: 'Date parameter is required' });
                return;
            }

            const deletedCount = await this.deleteOlderThanUseCase.execute(date as string);
            res.status(200).json({ message: `Deleted ${deletedCount} old attempts successfully.` });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
