import { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User, UserRole } from "../../../domain/entities/user.entity.js";

import { PasswordHasher } from "../../interfaces/password-hasher.interface.js";
import { IdGenerator } from "../../interfaces/id-generator.interface.js";

export interface CreateInput {
    userName: string;
    email: string;
    password: string;
    role: UserRole;
}

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly idGenerator: IdGenerator
    ) { }

    async execute(input: CreateInput): Promise<User> {
        //Verify if the user already exists
        const existingUser = await this.userRepository.getByEmail(input.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        //Hash the password
        const hashedPassword = await this.passwordHasher.hash(input.password);

        //Generate ID and create user
        const newUser = new User(
            this.idGenerator.generate(),
            input.userName,
            input.email,
            hashedPassword,
            input.role
        );

        return this.userRepository.create(newUser);
    }
}
