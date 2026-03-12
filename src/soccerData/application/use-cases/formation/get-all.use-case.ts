import { Formation } from "../../../domain/entities/formation.entity.js";
import { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";

// Use Case to get all formations
export class GetAllFormationsUseCase {
    constructor(
        private readonly formationRepository: FormationRepository
    ) { }

    /**
     * Executes getting all formations
     * @returns A list of formations
     */
    async execute(): Promise<Formation[]> {
        return this.formationRepository.getAll();
    }
}
