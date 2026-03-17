// Express
import { Router } from 'express';

// Controller
import { UserLeagueMembershipController } from '../controllers/user-league-membership.controller.js';
// Use Cases
import { CreateUserLeagueMembershipUseCase } from '../../application/use-cases/user-league-membership/create.use-case.js';
import { UpdateUserLeagueMembershipUseCase } from '../../application/use-cases/user-league-membership/update.use-case.js';
import { DeleteUserLeagueMembershipUseCase } from '../../application/use-cases/user-league-membership/delete.use-case.js';
import { GetUserLeagueMembershipByIdUseCase } from '../../application/use-cases/user-league-membership/get-by-id.use-case.js';
import { GetMembershipByUserAndLeagueUseCase } from '../../application/use-cases/user-league-membership/get-by-user-and-league.use-case.js';
import { GetMembershipsByUserUseCase } from '../../application/use-cases/user-league-membership/get-by-user.use-case.js';
import { GetMembershipsByLeagueUseCase } from '../../application/use-cases/user-league-membership/get-by-league.use-case.js';
import { IncrementScoreUseCase } from '../../application/use-cases/user-league-membership/increment-score.use-case.js';
import { userLeagueMembershipRepository, userRepository, userLeagueRepository, idGenerator } from '../container.js';

const router = Router();

// Dependency Injection
const createUseCase = new CreateUserLeagueMembershipUseCase(userLeagueMembershipRepository, userRepository, userLeagueRepository, idGenerator);
const updateUseCase = new UpdateUserLeagueMembershipUseCase(userLeagueMembershipRepository);
const deleteUseCase = new DeleteUserLeagueMembershipUseCase(userLeagueMembershipRepository);
const getByIdUseCase = new GetUserLeagueMembershipByIdUseCase(userLeagueMembershipRepository);
const getByUserAndLeagueUseCase = new GetMembershipByUserAndLeagueUseCase(userLeagueMembershipRepository);
const getByUserUseCase = new GetMembershipsByUserUseCase(userLeagueMembershipRepository);
const getByLeagueUseCase = new GetMembershipsByLeagueUseCase(userLeagueMembershipRepository);
const incrementScoreUseCase = new IncrementScoreUseCase(userLeagueMembershipRepository);

const controller = new UserLeagueMembershipController(
    createUseCase,
    updateUseCase,
    deleteUseCase,
    getByIdUseCase,
    getByUserAndLeagueUseCase,
    getByUserUseCase,
    getByLeagueUseCase,
    incrementScoreUseCase
);

// Routes
router.post('/', controller.create);
router.get('/id/:id', controller.getById);
router.get('/user/:userId/league/:leagueId', controller.getByUserAndLeague);
router.get('/user/:userId', controller.getByUser);
router.get('/league/:leagueId', controller.getByLeague);
router.patch('/increment-score/:id', controller.incrementScore);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as userLeagueMembershipRouter };
