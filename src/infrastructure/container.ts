/**
 * @file container.ts
 * @description Dependency Injection Container.
 * This file is responsible for instantiating and exporting all the repositories,
 * services, and other dependencies used across the application.
 */

// ============================================================================
//                                 IMPORTS
// ============================================================================

// --- InMemory Repositories ---
import { InMemoryCountryRepository } from "./repositories/in-memory-country.repository.js";
import { InMemoryFormationRepository } from "./repositories/in-memory-formation.repository.js";
import { InMemoryLeagueRepository } from "./repositories/in-memory-league.repository.js";
import { InMemoryTeamRepository } from "./repositories/in-memory-team.repository.js";
import { InMemoryPlayerRepository } from "./repositories/in-memory-player.repository.js";

import { InMemoryUserRepository } from './repositories/in-memory-user.repository.js';
import { InMemoryUserLeagueRepository } from './repositories/in-memory-user-league.repository.js';
import { InMemoryUserLeagueMembershipRepository } from './repositories/in-memory-user-league-membership.repository.js';

// --- SQL Repositories ---
import { CountryRepositoryImpl } from "./repositories/country.repository.impl.js";
import { FormationRepositoryImpl } from "./repositories/formation.repository.impl.js";
import { LeagueRepositoryImpl } from "./repositories/league.repository.impl.js";
import { TeamRepositoryImpl } from "./repositories/team.repository.impl.js";
import { PlayerRepositoryImpl } from "./repositories/player.repository.impl.js";

import { UserRepositoryImpl } from './repositories/user.repository.impl.js';
import { UserLeagueRepositoryImpl } from "./repositories/user-league.repository.impl.js";
import { UserLeagueMembershipRepositoryImpl } from "./repositories/user-league-membership.repository.impl.js";

// --- Services ---
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';
import { UuidInviteCodeGenerator } from './services/invite-code.generator.js';
import { CacheService } from './services/cache.service.js';
import { JwtTokenService } from "./services/jwt-token.service.js";


// ============================================================================
//                                INSTANCES
// ============================================================================

// --- Service Instances ---
const passwordHasher = new BcryptPasswordHasher();
const idGenerator = new UuidIdGenerator();
const inviteCodeGenerator = new UuidInviteCodeGenerator();
const cacheService = new CacheService();
const tokenService = new JwtTokenService();

// --- Repository Instances ---
const countryRepository = new CountryRepositoryImpl(cacheService);
const formationRepository = new FormationRepositoryImpl(cacheService);
const leagueRepository = new LeagueRepositoryImpl(cacheService);
const teamRepository = new TeamRepositoryImpl(cacheService);
const playerRepository = new PlayerRepositoryImpl(cacheService);

const userRepository = new UserRepositoryImpl();
const userLeagueRepository = new UserLeagueRepositoryImpl();
const userLeagueMembershipRepository = new UserLeagueMembershipRepositoryImpl();



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
    inviteCodeGenerator,
    cacheService,
    tokenService
};

