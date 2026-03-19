// Express
import { Router } from 'express';

// Controller
import { UserController } from '../controllers/user.controller.js';
// Use Cases
import { CreateUserUseCase } from '../../application/use-cases/user/create.use-case.js';
import { UpdateUserUseCase } from '../../application/use-cases/user/update.use-case.js';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete.use-case.js';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-by-id.use-case.js';
import { GetUserByUserNameUseCase } from '../../application/use-cases/user/get-by-user-name.use-case.js';
import { GetUserByEmailUseCase } from '../../application/use-cases/user/get-by-email.use-case.js';
import { GetUsersByRoleUseCase } from '../../application/use-cases/user/get-by-role.use-case.js';
import { GetAllUsersUseCase } from '../../application/use-cases/user/get-all.use-case.js';
import { userRepository, passwordHasher, idGenerator } from '../container.js';

const router = Router();

// Dependency Injection
const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher, idGenerator);
const updateUserUseCase = new UpdateUserUseCase(userRepository, passwordHasher);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const getUserByUserNameUseCase = new GetUserByUserNameUseCase(userRepository);
const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
const getUsersByRoleUseCase = new GetUsersByRoleUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

const userController = new UserController(
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    getUserByIdUseCase,
    getUserByUserNameUseCase,
    getUserByEmailUseCase,
    getUsersByRoleUseCase,
    getAllUsersUseCase
);

// Routes
router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/id/:id', userController.getById);
router.get('/username/:userName', userController.getByUserName);
router.get('/email/:email', userController.getByEmail);
router.get('/role/:role', userController.getByRole);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export { router as userRouter };
