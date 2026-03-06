import { InMemoryUserRepository } from './repositories/in-memory-user.repository.js';
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';

const userRepository = new InMemoryUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const idGenerator = new UuidIdGenerator();

export { userRepository, passwordHasher, idGenerator };
