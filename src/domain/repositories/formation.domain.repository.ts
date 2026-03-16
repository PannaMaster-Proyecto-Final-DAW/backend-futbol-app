import type { Formation } from "../entities/formation.entity.js";

export interface FormationRepository {
    // CRUD operations
    create(formation: Formation): Promise<Formation>;
    update(id: string, formation: Partial<Formation>): Promise<Formation | null>;
    // update(id: string, formation: Formation): Promise<Formation | null>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getAll(): Promise<Formation[]>;
    getById(id: string): Promise<Formation | null>;
    getByName(name: string): Promise<Formation | null>;
}
