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
    defenders: PlayerPosition[];
    midfielders: PlayerPosition[];
    forwards: PlayerPosition[];
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

        // 2. Creates the formation entity
        const formation = new Formation(
            id,
            input.name,
            input.goalkeeper ?? PlayerPosition.GK,
            input.defenders,
            input.midfielders,
            input.forwards
        );

        // 3. Saves the formation using the repository
        return this.formationRepository.create(formation);
    }
}
