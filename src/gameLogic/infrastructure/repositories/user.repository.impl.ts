import { User, UserRole } from '../../domain/entities/user.entity.js';
import type { UserRepository } from '../../domain/repositories/user.domain.repositoy.js';
import { UserModel } from '../../../infrastructure/models/user.model.js';

export class UserRepositoryImpl implements UserRepository {
    /**
     * Create a new user and persist it to the database.
     * Re-fetches the user from the database after creation to ensure all
     * database-generated values and associations are included.
     */
    async create(user: User): Promise<User> {
        const newUser = await UserModel.create({
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            role: user.role
        });

        const created = await this.getById(newUser.id);
        if (!created) throw new Error('Error creating user');
        return created;
    }

    /**
     * Update an existing user.
     * Performs a partial update and returns the fully reconstructed entity.
     */
    async update(user: User): Promise<User> {
        const updateData: any = {};

        //Verify which fields are going to be updated
        if (user.userName) updateData.userName = user.userName;
        if (user.email) updateData.email = user.email;
        if (user.password) updateData.password = user.password;
        if (user.role) updateData.role = user.role;

        // affectedCount is the number of rows affected by the update
        const [affectedCount] = await UserModel.update(updateData, {
            where: { id: user.id }
        });

        if (affectedCount === 0) {
            throw new Error('User not found');
        }

        const updated = await this.getById(user.id);
        if (!updated) throw new Error('User not found after update');

        return updated;
    }

    //Delete a user from the database by its ID.
    async delete(id: string): Promise<boolean> {
        const deletedCount = await UserModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    //Find a user by its unique ID.
    async getById(id: string): Promise<User | null> {
        const model = await UserModel.findByPk(id);
        if (!model) return null;
        return this.toEntity(model);
    }

    //Find a user by their username.
    async getByUserName(userName: string): Promise<User | null> {
        const model = await UserModel.findOne({ where: { userName } });
        if (!model) return null;
        return this.toEntity(model);
    }

    //Find a user by their email.
    async getByEmail(email: string): Promise<User | null> {
        const model = await UserModel.findOne({ where: { email } });
        if (!model) return null;
        return this.toEntity(model);
    }

    //Retrieve all users with a specific role.
    async getByRole(role: UserRole): Promise<User[]> {
        const models = await UserModel.findAll({ where: { role } });
        return models.map(m => this.toEntity(m));
    }

    //Retrieve all users from the database.
    async getAll(): Promise<User[]> {
        const models = await UserModel.findAll();
        return models.map(m => this.toEntity(m));
    }

    //Map a UserModel (Sequelize) to a User domain entity.
    private toEntity(model: UserModel): User {
        if (!model) throw new Error('User model is null');
        return new User(
            model.id,
            model.userName,
            model.email,
            model.password,
            model.role
        );
    }
}