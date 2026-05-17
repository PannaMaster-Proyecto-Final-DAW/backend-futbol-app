import type { Request, Response } from 'express';
import { CreateDailyChallengeUseCase } from '../../application/use-cases/daily-challenge/create.use-case.js';
import { UpdateDailyChallengeUseCase } from '../../application/use-cases/daily-challenge/update.use-case.js';
import { GetDailyChallengeByDateUseCase } from '../../application/use-cases/daily-challenge/get-by-date.use-case.js';
import { DeleteOlderDailyChallengesUseCase } from '../../application/use-cases/daily-challenge/delete-older-than.use-case.js';

export class DailyChallengeController {
    constructor(
        private readonly createUseCase: CreateDailyChallengeUseCase,
        private readonly updateUseCase: UpdateDailyChallengeUseCase,
        private readonly getByDateUseCase: GetDailyChallengeByDateUseCase,
        private readonly deleteOlderThanUseCase: DeleteOlderDailyChallengesUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getByDate = this.getByDate.bind(this);
        this.deleteOlderThan = this.deleteOlderThan.bind(this);
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const challenge = await this.createUseCase.execute(data);
            res.status(201).json(challenge);
        } catch (error: any) {
            console.error(error);
            if (error.message && error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: error.message || 'Bad Request' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const date = req.params.date as string;
            const gameId = req.params.gameId as string;
            const modeId = req.params.modeId as string;
            const data = req.body;
            
            // Check if required params are present
            if (!date || !gameId || !modeId) {
                res.status(400).json({ error: 'Missing parameters: date, gameId, and modeId are required' });
                return;
            }

            const updatedChallenge = await this.updateUseCase.execute({
                date,
                gameId,
                modeId,
                challengeData: data.challengeData
            });
            
            if (!updatedChallenge) {
                res.status(404).json({ error: 'Daily challenge not found to update' });
                return;
            }

            res.status(200).json(updatedChallenge);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || 'Bad Request' });
        }
    }

    async getByDate(req: Request, res: Response) {
        try {
            const date = req.params.date as string;
            const gameId = req.params.gameId as string;
            const modeId = req.params.modeId as string;
            
            if (!date || !gameId || !modeId) {
                res.status(400).json({ error: 'Missing parameters: date, gameId, and modeId are required' });
                return;
            }

            const challenge = await this.getByDateUseCase.execute(date, gameId, modeId);
            
            if (!challenge) {
                res.status(404).json({ error: 'Daily challenge not found for this date, game and mode' });
                return;
            }

            res.status(200).json(challenge);
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
            res.status(200).json({ message: `Deleted ${deletedCount} old challenges successfully.` });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
