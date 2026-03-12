import { InMemoryUserRepository } from './repositories/in-memory-user.repository.js';
import { InMemoryUserLeagueRepository } from './repositories/in-memory-user-league.repository.js';
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';
import { UuidInviteCodeGenerator } from './services/invite-code.generator.js';

const userRepository = new InMemoryUserRepository();
const userLeagueRepository = new InMemoryUserLeagueRepository();
const passwordHasher = new BcryptPasswordHasher();
const idGenerator = new UuidIdGenerator();
const inviteCodeGenerator = new UuidInviteCodeGenerator();

export { userRepository, userLeagueRepository, passwordHasher, idGenerator, inviteCodeGenerator };
