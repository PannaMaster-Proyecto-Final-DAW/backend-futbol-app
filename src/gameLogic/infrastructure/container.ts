import { UserRepositoryImpl } from './repositories/user.repository.impl.js';
import { InMemoryUserLeagueRepository } from './repositories/in-memory-user-league.repository.js';
import { InMemoryUserLeagueMembershipRepository } from './repositories/in-memory-user-league-membership.repository.js';
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';
import { UuidInviteCodeGenerator } from './services/invite-code.generator.js';

const userRepository = new UserRepositoryImpl();
const userLeagueRepository = new InMemoryUserLeagueRepository();
const userLeagueMembershipRepository = new InMemoryUserLeagueMembershipRepository();
const passwordHasher = new BcryptPasswordHasher();
const idGenerator = new UuidIdGenerator();
const inviteCodeGenerator = new UuidInviteCodeGenerator();

export { userRepository, userLeagueRepository, userLeagueMembershipRepository, passwordHasher, idGenerator, inviteCodeGenerator };
