import type { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";

// Input for Formation deletion
export interface DeleteFormationInput {
    id: string;
}

// Use Case to delete a formation
export class DeleteFormationUseCase {
    constructor(
        private readonly formationRepository: FormationRepository
    ) { }

    /**
     * Executes the deletion of a formation
     * @param input - The input data containing the ID to delete
     * @returns True if deleted, false otherwise
     */
    async execute(input: DeleteFormationInput): Promise<boolean> {
        return this.formationRepository.delete(input.id);
    }
}
