// In-Memory Implementation
import { InMemoryCountryRepository } from "./repositories/in-memory-country.repository.js";
import { InMemoryLeagueRepository } from "./repositories/in-memory-league.repository.js";
import { InMemoryTeamRepository } from "./repositories/in-memory-team.repository.js";

// Services
import { UuidGenerator } from "./services/uuid-generator.js";


// Singleton instances
// In-Memory Implementation
export const countryRepository = new InMemoryCountryRepository();
export const leagueRepository = new InMemoryLeagueRepository();
export const teamRepository = new InMemoryTeamRepository();

// Services
export const idGenerator = new UuidGenerator();