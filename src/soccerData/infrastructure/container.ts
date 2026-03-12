// In-Memory Implementation
import { InMemoryCountryRepository } from "./repositories/in-memory-country.js";
import { InMemoryFormationRepository } from "./repositories/in-memory-formation.js";

// Services
import { UuidGenerator } from "./services/uuid-generator.js";


// Singleton instances
// In-Memory Implementation
export const countryRepository = new InMemoryCountryRepository();
export const formationRepository = new InMemoryFormationRepository();

// Services
export const idGenerator = new UuidGenerator();