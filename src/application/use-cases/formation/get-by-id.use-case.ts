import { Formation } from "../../../domain/entities/formation.entity.js";
import { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";

// Input for getting a formation by ID
export interface GetFormationByIdInput {
    id: string;
}

// Use Case to get a formation by ID
export class GetFormationByIdUseCase {
    constructor(
        private readonly formationRepository: FormationRepository
    ) { }

    /**
     * Executes getting a formation by its ID
     * @param input - The input data containing the ID to search for
     * @returns The formation if found, null otherwise
     */
    async execute(input: GetFormationByIdInput): Promise<Formation | null> {
        return this.formationRepository.getById(input.id);
    }
}
