import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

export interface DeleteLeagueInput {
    id: string;
}

/**
 * Use case to delete a league.
 */
export class DeleteLeagueUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the deletion of a league.
     * @param input - The input data containing the league ID to delete.
     * @returns A promise that resolves to true if deleted, false otherwise.
     */
    async execute(input: DeleteLeagueInput): Promise<boolean> {
        return this.leagueRepository.delete(input.id);
    }
}
