import { Country } from "../../domain/entities/country.entity.js";
import { CountryRepository } from "../../domain/repositories/country.domain.repository.js";

export class InMemoryCountryRepository implements CountryRepository {
    private countries: Country[] = [];

    // Create a new country
    async create(country: Country): Promise<Country> {
        this.countries.push(country);
        return country;
    }

    // Update a country
    async update(country: Country): Promise<Country> {
        const index = this.countries.findIndex(c => c.id === country.id);
        if (index !== -1) {
            this.countries[index] = country;
            return country;
        }
        throw new Error(`Country with id ${country.id} not found`);
    }

    // Delete a country
    async delete(id: string): Promise<boolean> {
        const index = this.countries.findIndex(c => c.id === id);
        if (index === -1) {
            return false;
        }
        this.countries.splice(index, 1);
        return true;
    }

    // Get all countries
    async getAll(): Promise<Country[]> {
        return [...this.countries];
    }

    // Get country by id
    async getById(id: string): Promise<Country | null> {
        return this.countries.find(c => c.id === id) || null;
    }

    // Get country by name
    async getByName(name: string): Promise<Country | null> {
        return this.countries.find(c => c.name.toLowerCase() === name.toLowerCase()) || null;
    }

    // Get countries by tier
    async getByTier(tier: number, category: 'male' | 'female'): Promise<Country[]> {
        return this.countries.filter(c => {
            return category === 'male' ? c.tierMale === tier : c.tierFemale === tier;
        });
    }
}
