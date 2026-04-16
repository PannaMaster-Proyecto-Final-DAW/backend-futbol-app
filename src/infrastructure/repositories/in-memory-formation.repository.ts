import { Formation } from "../../domain/entities/formation.entity.js";
import { FormationRepository } from "../../domain/repositories/formation.domain.repository.js";

export class InMemoryFormationRepository implements FormationRepository {
    private formations: Formation[] = [];

    // Create a new formation
    async create(formation: Formation): Promise<Formation> {
        this.formations.push(formation);
        return formation;
    }

    // Update a formation
    async update(id: string, formation: Formation): Promise<Formation | null> {
        const index = this.formations.findIndex(f => f.id === id);
        if (index !== -1) {
            this.formations[index] = formation;
            return formation;
        }
        return null;
    }

    // Delete a formation
    async delete(id: string): Promise<boolean> {
        const index = this.formations.findIndex(f => f.id === id);
        if (index === -1) {
            return false;
        }
        this.formations.splice(index, 1);
        return true;
    }

    // Get all formations
    async getAll(): Promise<Formation[]> {
        return [...this.formations];
    }

    // Get formation by id
    async getById(id: string): Promise<Formation | null> {
        return this.formations.find(f => f.id === id) || null;
    }

    // Get formation by name
    async getByName(name: string): Promise<Formation | null> {
        return this.formations.find(f => f.name.toLowerCase() === name.toLowerCase()) || null;
    }
}
