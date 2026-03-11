import { Formation } from "../../../domain/entities/formation.entity.js";
import { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";
import { PlayerPosition } from "../../../domain/entities/player.entity.js";

// Port ID generation
export interface IdGenerator {
    generateId(): string;
}

// Input for Formation creation
export interface CreateFormationInput {
    name: string;
    goalkeeper?: PlayerPosition;
    defenders?: PlayerPosition[];
    midfielders?: PlayerPosition[];
    forwards?: PlayerPosition[];
    positionsList?: PlayerPosition[];
}

// Use Case to create a new formation
export class CreateFormationUseCase {
    constructor(
        private readonly formationRepository: FormationRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a formation
     * @param input - The input data for creating a formation
     * @returns The created formation
     */
    async execute(input: CreateFormationInput): Promise<Formation> {
        // 1. Generates a unique ID 
        const id = this.idGenerator.generateId();

        let formation: Formation;

        // 2. Decide creation mode
        if (input.positionsList && input.positionsList.length > 0) {
            // Validation: Ensure exactly 11 players are provided for automatic mode
            if (input.positionsList.length !== 11) {
                throw new Error(`Formation creation failed: Expected 11 positions, but received ${input.positionsList.length}.`);
            }
            // Automatic Classification Mode
            formation = Formation.createFromPositionsList(id, input.name, input.positionsList);
        } else {
            // Manual Mode
            formation = new Formation(
                id,
                input.name,
                input.goalkeeper ?? PlayerPosition.GK,
                input.defenders ?? [],
                input.midfielders ?? [],
                input.forwards ?? []
            );
        }

        // 3. Saves the formation using the repository
        return this.formationRepository.create(formation);
    }
}
