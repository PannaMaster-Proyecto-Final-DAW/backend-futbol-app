import { League, LeagueCategory } from "../../../domain/entities/league.entity.js";
import { LeagueRepository } from "../../../domain/repositories/league.domain.repository.js";

export interface GetLeagueByCategoryInput {
    category: LeagueCategory;
}

/**
 * Use case to retrieve leagues by category.
 */
export class GetLeagueByCategoryUseCase {
    constructor(
        private readonly leagueRepository: LeagueRepository
    ) { }

    /**
     * Executes the retrieval of leagues by category.
     * @param input - The input data containing the league category.
     * @returns A promise that resolves to an array of League entities.
     */
    async execute(input: GetLeagueByCategoryInput): Promise<League[]> {
        return this.leagueRepository.getByCategory(input.category);
    }
}
