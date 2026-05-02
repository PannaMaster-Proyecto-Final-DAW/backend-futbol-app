import { Formation } from "../../../domain/entities/formation.entity.js";
import { FormationRepository } from "../../../domain/repositories/formation.domain.repository.js";
import { PlayerPosition } from "../../../domain/entities/player.entity.js";
import { createFormationSchema } from "../../../infrastructure/validation/schemas/formation.schema.js";
import { validateData } from "../../../infrastructure/validation/zod-validator.js";

// Port ID generation
export interface IdGenerator {
    generate(): string;
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
        const validatedInput = validateData(createFormationSchema, input);

        // 1. Generates a unique ID 
        const id = this.idGenerator.generate();

        let formation: Formation;

        // 2. Decide creation mode
        if (validatedInput.positionsList && validatedInput.positionsList.length > 0) {
            // Automatic Classification Mode
            formation = Formation.createFromPositionsList(id, validatedInput.name, validatedInput.positionsList);
        } else {
            // Manual Mode
            formation = new Formation(
                id,
                validatedInput.name,
                validatedInput.goalkeeper ?? PlayerPosition.GK,
                validatedInput.defenders ?? [],
                validatedInput.midfielders ?? [],
                validatedInput.forwards ?? []
            );
        }

        // 3. Saves the formation using the repository
        return this.formationRepository.create(formation);
    }
}
