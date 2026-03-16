import { TeamRepository } from "../../../domain/repositories/team.domain.repository.js";

export interface DeleteTeamInput {
    id: string;
}

/**
 * Use case to delete a team by its ID.
 */
export class DeleteTeamUseCase {
    constructor(
        private readonly teamRepository: TeamRepository
    ) { }

    /**
     * Executes the deletion of a team.
     * @param input - The input data containing the team ID.
     * @returns A promise that resolves to true if deleted, false otherwise.
     */
    async execute(input: DeleteTeamInput): Promise<boolean> {
        return this.teamRepository.delete(input.id);
    }
}
