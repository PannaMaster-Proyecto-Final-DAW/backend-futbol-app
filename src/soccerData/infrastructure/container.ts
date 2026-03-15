// In-Memory Implementation
import { InMemoryCountryRepository } from "./repositories/in-memory-country.repository.js";
import { InMemoryFormationRepository } from "./repositories/in-memory-formation.js";
import { InMemoryLeagueRepository } from "./repositories/in-memory-league.repository.js";
import { InMemoryTeamRepository } from "./repositories/in-memory-team.repository.js";
import { InMemoryPlayerRepository } from "./repositories/in-memory-player.repository.js";

// Services
import { UuidGenerator } from "./services/uuid-generator.js";

// Singleton instances
// In-Memory Implementation
export const countryRepository = new InMemoryCountryRepository();
export const formationRepository = new InMemoryFormationRepository();
export const leagueRepository = new InMemoryLeagueRepository();
export const teamRepository = new InMemoryTeamRepository();
export const playerRepository = new InMemoryPlayerRepository();

// Services
export const idGenerator = new UuidGenerator();