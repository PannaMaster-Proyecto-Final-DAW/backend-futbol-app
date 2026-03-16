import type { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";
import type { Formation } from "../../../domain/entities/formation.entity.js";
import type { PlayerPosition } from "../../../domain/entities/player.entity.js";

/**
 * Input for updating a formation.
 * All fields except id are optional to allow partial updates.
 */
export interface UpdateFormationInput {
    id: string;
    name?: string;
    goalkeeper?: PlayerPosition;
    defenders?: PlayerPosition[];
    midfielders?: PlayerPosition[];
    forwards?: PlayerPosition[];
}

// Use Case to update an existing formation.
export class UpdateFormationUseCase {
    constructor(
        private readonly formationRepository: FormationRepository,
    ) { }

    /**
     * Executes the update of a formation.
     * @param input - Input object with the data to update.
     * @returns The updated Formation entity.
     * @throws Error if the formation is not found.
     */
    async execute(input: UpdateFormationInput): Promise<Formation> {
        const formation = await this.formationRepository.getById(input.id);
        if (!formation) {
            throw new Error(`Formation with id ${input.id} not found`);
        }

        // Update fields if they are present in the Input
        if (input.name !== undefined) formation.name = input.name;
        if (input.goalkeeper !== undefined) formation.goalkeeper = input.goalkeeper;
        if (input.defenders !== undefined) formation.defenders = input.defenders;
        if (input.midfielders !== undefined) formation.midfielders = input.midfielders;
        if (input.forwards !== undefined) formation.forwards = input.forwards;

        const updatedFormation = await this.formationRepository.update(input.id, formation);
        if (!updatedFormation) {
            throw new Error(`Formation with id ${input.id} could not be updated`);
        }

        return updatedFormation;
    }
}
