import type { Country } from "../entities/country.entity.js";

export interface CountryRepository {
    // CRUD operations
    create(country: Country): Promise<Country>;
    update(country: Country): Promise<Country>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getAll(): Promise<Country[]>;
    getById(id: string): Promise<Country | null>;
    getByName(name: string): Promise<Country | null>;
}
