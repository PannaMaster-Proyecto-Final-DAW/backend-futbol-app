// In-Memory Implementation
import { InMemoryCountryRepository } from "./repositories/in-memory-country.js";

// Services
import { UuidGenerator } from "./services/uuid-generator.js";


// Singleton instances
// In-Memory Implementation
export const countryRepository = new InMemoryCountryRepository();

// Services
export const idGenerator = new UuidGenerator();