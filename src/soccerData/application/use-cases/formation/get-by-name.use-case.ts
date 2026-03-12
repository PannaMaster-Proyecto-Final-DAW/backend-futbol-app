import { Formation } from "../../../domain/entities/formation.entity.js";
import { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";

// Input for getting a formation by name
export interface GetFormationByNameInput {
    name: string;
}

// Use Case to get a formation by name
export class GetFormationByNameUseCase {
    constructor(
        private readonly formationRepository: FormationRepository
    ) { }

    /**
     * Executes getting a formation by its name
     * @param input - The input data containing the name to search for
     * @returns The formation if found, null otherwise
     */
    async execute(input: GetFormationByNameInput): Promise<Formation | null> {
        return this.formationRepository.getByName(input.name);
    }
}
