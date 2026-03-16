/**
 * @file container.ts
 * @description Dependency Injection Container.
 * This file is responsible for instantiating and exporting all the repositories,
 * services, and other dependencies used across the application.
 */

// ============================================================================
//                                 IMPORTS
// ============================================================================

// --- Repositories ---
import { InMemoryCountryRepository } from "./repositories/in-memory-country.repository.js";
import { InMemoryFormationRepository } from "./repositories/in-memory-formation.js";
import { InMemoryLeagueRepository } from "./repositories/in-memory-league.repository.js";
import { InMemoryTeamRepository } from "./repositories/in-memory-team.repository.js";
import { InMemoryPlayerRepository } from "./repositories/in-memory-player.repository.js";

import { UserRepositoryImpl } from './repositories/user.repository.impl.js';
import { InMemoryUserLeagueRepository } from './repositories/in-memory-user-league.repository.js';
import { InMemoryUserLeagueMembershipRepository } from './repositories/in-memory-user-league-membership.repository.js';

// --- Services ---
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';
import { UuidInviteCodeGenerator } from './services/invite-code.generator.js';

// ============================================================================
//                                INSTANCES
// ============================================================================

// --- Repository Instances ---
const countryRepository = new InMemoryCountryRepository();
const formationRepository = new InMemoryFormationRepository();
const leagueRepository = new InMemoryLeagueRepository();
const teamRepository = new InMemoryTeamRepository();
const playerRepository = new InMemoryPlayerRepository();

const userRepository = new UserRepositoryImpl();
const userLeagueRepository = new InMemoryUserLeagueRepository();
const userLeagueMembershipRepository = new InMemoryUserLeagueMembershipRepository();

// --- Service Instances ---
const passwordHasher = new BcryptPasswordHasher();
const idGenerator = new UuidIdGenerator();
const inviteCodeGenerator = new UuidInviteCodeGenerator();

// ============================================================================
//                                 EXPORTS
// ============================================================================

export {
    userRepository,
    userLeagueRepository,
    userLeagueMembershipRepository,
    countryRepository,
    formationRepository,
    leagueRepository,
    teamRepository,
    playerRepository,
    passwordHasher,
    idGenerator,
    inviteCodeGenerator
};
