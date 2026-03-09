// In-Memory Implementation
import { InMemoryCountryRepository } from "./repositories/in-memory-country.js";
import { InMemoryLeagueRepository } from "./repositories/in-memory-league.repository.js";

// Services
import { UuidGenerator } from "./services/uuid-generator.js";


// Singleton instances
// In-Memory Implementation
export const countryRepository = new InMemoryCountryRepository();
export const leagueRepository = new InMemoryLeagueRepository();

// Services
export const idGenerator = new UuidGenerator();