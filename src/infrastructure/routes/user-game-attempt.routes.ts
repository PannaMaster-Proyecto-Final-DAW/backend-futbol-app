import { Router } from 'express';
import { UserGameAttemptController } from '../controllers/user-game-attempt.controller.js';
import { SaveUserGameAttemptUseCase } from '../../application/use-cases/user-game-attempt/save.use-case.js';
import { GetUserGameAttemptByDateUseCase } from '../../application/use-cases/user-game-attempt/get-by-user-and-date.use-case.js';
import { DeleteOlderUserGameAttemptsUseCase } from '../../application/use-cases/user-game-attempt/delete-older-than.use-case.js';
import { userGameAttemptRepository, idGenerator } from '../container.js';
import { validateRequest } from './middlewares/validate-request.middleware.js';
import { saveUserGameAttemptSchema } from '../validation/schemas/user-game-attempt.schema.js';

const router = Router();

const saveUseCase = new SaveUserGameAttemptUseCase(userGameAttemptRepository, idGenerator);
const getByUserAndDateUseCase = new GetUserGameAttemptByDateUseCase(userGameAttemptRepository);
const deleteOlderThanUseCase = new DeleteOlderUserGameAttemptsUseCase(userGameAttemptRepository);

const controller = new UserGameAttemptController(
    saveUseCase,
    getByUserAndDateUseCase,
    deleteOlderThanUseCase
);

router.get('/:userId/:date/:gameId', controller.getByUserAndDate);
router.post('/', validateRequest(saveUserGameAttemptSchema), controller.save);
router.delete('/older-than/:date', controller.deleteOlderThan);

export { router as userGameAttemptRouter };
