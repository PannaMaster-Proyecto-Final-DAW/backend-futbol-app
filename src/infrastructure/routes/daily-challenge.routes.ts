import { Router } from 'express';
import { DailyChallengeController } from '../controllers/daily-challenge.controller.js';
import { CreateDailyChallengeUseCase } from '../../application/use-cases/daily-challenge/create.use-case.js';
import { UpdateDailyChallengeUseCase } from '../../application/use-cases/daily-challenge/update.use-case.js';
import { GetDailyChallengeByDateUseCase } from '../../application/use-cases/daily-challenge/get-by-date.use-case.js';
import { DeleteOlderDailyChallengesUseCase } from '../../application/use-cases/daily-challenge/delete-older-than.use-case.js';
import { dailyChallengeRepository } from '../container.js';
import { validateRequest } from './middlewares/validate-request.middleware.js';
import { createDailyChallengeSchema, updateDailyChallengeSchema } from '../validation/schemas/daily-challenge.schema.js';

const router = Router();

const createUseCase = new CreateDailyChallengeUseCase(dailyChallengeRepository);
const updateUseCase = new UpdateDailyChallengeUseCase(dailyChallengeRepository);
const getByDateUseCase = new GetDailyChallengeByDateUseCase(dailyChallengeRepository);
const deleteOlderThanUseCase = new DeleteOlderDailyChallengesUseCase(dailyChallengeRepository);

const controller = new DailyChallengeController(
    createUseCase,
    updateUseCase,
    getByDateUseCase,
    deleteOlderThanUseCase
);

router.get('/:date/:gameId/:modeId', controller.getByDate);
router.post('/', validateRequest(createDailyChallengeSchema), controller.create);
router.patch('/:date/:gameId/:modeId', validateRequest(updateDailyChallengeSchema), controller.update);
router.delete('/older-than/:date', controller.deleteOlderThan);

export { router as dailyChallengeRouter };
