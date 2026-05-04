// Express
import { Router } from 'express';

// Controller
import { UserLeagueController } from '../controllers/user-league.controller.js';

// Validation
import { validateRequest } from './middlewares/validate-request.middleware.js';
import { createUserLeagueSchema, updateUserLeagueSchema } from '../validation/schemas/user-league.schema.js';
// Use Cases
import { CreateUserLeagueUseCase } from '../../application/use-cases/user-league/create.use-case.js';
import { UpdateUserLeagueUseCase } from '../../application/use-cases/user-league/update.use-case.js';
import { DeleteUserLeagueUseCase } from '../../application/use-cases/user-league/delete.use-case.js';
import { GetUserLeagueByIdUseCase } from '../../application/use-cases/user-league/get-by-id.use-case.js';
import { GetUserLeagueByNameUseCase } from '../../application/use-cases/user-league/get-by-name.use-case.js';
import { GetAllUserLeaguesUseCase } from '../../application/use-cases/user-league/get-all.use-case.js';
import { userLeagueRepository, idGenerator, inviteCodeGenerator } from '../container.js';

const router = Router();

// Dependency Injection
const createUserLeagueUseCase = new CreateUserLeagueUseCase(userLeagueRepository, idGenerator, inviteCodeGenerator);
const updateUserLeagueUseCase = new UpdateUserLeagueUseCase(userLeagueRepository);
const deleteUserLeagueUseCase = new DeleteUserLeagueUseCase(userLeagueRepository);
const getUserLeagueByIdUseCase = new GetUserLeagueByIdUseCase(userLeagueRepository);
const getUserLeagueByNameUseCase = new GetUserLeagueByNameUseCase(userLeagueRepository);
const getAllUserLeaguesUseCase = new GetAllUserLeaguesUseCase(userLeagueRepository);

const userLeagueController = new UserLeagueController(
    createUserLeagueUseCase,
    updateUserLeagueUseCase,
    deleteUserLeagueUseCase,
    getUserLeagueByIdUseCase,
    getUserLeagueByNameUseCase,
    getAllUserLeaguesUseCase
);

// Routes
router.post('/', validateRequest(createUserLeagueSchema), userLeagueController.create);
router.get('/', userLeagueController.getAll);
router.get('/id/:id', userLeagueController.getById);
router.get('/name/:name', userLeagueController.getByName);
router.patch('/:id', validateRequest(updateUserLeagueSchema), userLeagueController.update);
router.delete('/:id', userLeagueController.delete);

export { router as userLeagueRouter };
