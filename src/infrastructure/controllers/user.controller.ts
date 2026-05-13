import type { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/user/create.use-case.js';
import { UpdateUserUseCase } from '../../application/use-cases/user/update.use-case.js';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete.use-case.js';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-by-id.use-case.js';
import { GetUserByUserNameUseCase } from '../../application/use-cases/user/get-by-user-name.use-case.js';
import { GetUserByEmailUseCase } from '../../application/use-cases/user/get-by-email.use-case.js';
import { GetUsersByRoleUseCase } from '../../application/use-cases/user/get-by-role.use-case.js';
import { GetAllUsersUseCase } from '../../application/use-cases/user/get-all.use-case.js';
import { LoginUserUseCase } from '../../application/use-cases/user/login.use-case.js';
import { UserRole } from '../../domain/entities/user.entity.js';
import { TokenService } from '../../application/interfaces/token-service.interface.js';

export class UserController {
    /**
     * Constructor for UserController.
     * 
     * @param createUserUseCase - Use case to create a user.
     * @param updateUserUseCase - Use case to update a user.
     * @param deleteUserUseCase - Use case to delete a user.
     * @param getUserByIdUseCase - Use case to get a user by ID.
     * @param getUserByUserNameUseCase - Use case to get a user by username.
     * @param getUserByEmailUseCase - Use case to get a user by email.
     * @param getUsersByRoleUseCase - Use case to get users by role.
     * @param getAllUsersUseCase - Use case to get all users.
     * @param loginUserUseCase - Use case to handle user login.
     */
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly getUserByUserNameUseCase: GetUserByUserNameUseCase,
        private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
        private readonly getUsersByRoleUseCase: GetUsersByRoleUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly tokenService: TokenService // Service to generate JWT tokens
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUserName = this.getByUserName.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getByRole = this.getByRole.bind(this);
        this.getAll = this.getAll.bind(this);
        this.login = this.login.bind(this);
    }

    /**
     * Create a new user.
     * Expects userName, email, password, and role in the request body.
     */
    async create(req: Request, res: Response) {
        try {
            const { userName, email, password, role } = req.body;
            const user = await this.createUserUseCase.execute({
                userName,
                email,
                password,
                role
            });
            res.status(201).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }

    /**
     * User login.
     * Expects identifier (email or userName) and password in the request body.
     */
    async login(req: Request, res: Response) {
        try {
            const { identifier, password } = req.body;
            if (!identifier || !password) {
                res.status(400).json({ error: 'Identifier and password are required' });
                return;
            }
            const user = await this.loginUserUseCase.execute({ identifier, password });
            
            // Generate the JWT token
            const token = this.tokenService.generateToken({ id: user.id, role: user.role });
            
            // Return user and token
            res.status(200).json({ user, token });
        } catch (error: any) {
            console.error(error);
            const status = error.message === 'Invalid credentials' ? 401 : 500;
            res.status(status).json({ error: error.message || 'Internal Server Error' });
        }
    }

    /**
     * Get all users.
     */
    async getAll(req: Request, res: Response) {
        try {
            const users = await this.getAllUsersUseCase.execute();
            res.status(200).json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Get a user by ID.
     * Expects 'id' in the route parameters.
     */
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const user = await this.getUserByIdUseCase.execute(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Get a user by username.
     * Expects 'userName' in the route parameters.
     */
    async getByUserName(req: Request, res: Response) {
        try {
            const { userName } = req.params;
            if (!userName || typeof userName !== 'string') {
                res.status(400).json({ error: 'Invalid Username' });
                return;
            }
            const user = await this.getUserByUserNameUseCase.execute(userName);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Get a user by email.
     * Expects 'email' in the route parameters.
     */
    async getByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            if (!email || typeof email !== 'string') {
                res.status(400).json({ error: 'Invalid Email' });
                return;
            }
            const user = await this.getUserByEmailUseCase.execute(email);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Get users by role.
     * Expects 'role' in the route parameters.
     */
    async getByRole(req: Request, res: Response) {
        try {
            const { role } = req.params;
            if (!role || !Object.values(UserRole).includes(role as UserRole)) {
                res.status(400).json({ error: 'Invalid Role' });
                return;
            }
            const users = await this.getUsersByRoleUseCase.execute(role as UserRole);
            res.status(200).json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Update an existing user.
     * Expects 'id' in route parameters and fields to update in body.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const { userName, email, password, role } = req.body;
            const user = await this.updateUserUseCase.execute(id, {
                userName,
                email,
                password,
                role
            });
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }

    /**
     * Delete a user by ID.
     * Expects 'id' in the route parameters.
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const success = await this.deleteUserUseCase.execute(id);
            if (!success) {
                res.status(404).json({ error: 'User not found or could not be deleted' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
