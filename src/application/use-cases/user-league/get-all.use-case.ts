import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";
import { UserLeague } from "../../../domain/entities/user-league.entity.js";

export class GetAllUserLeaguesUseCase {
    constructor(
        private readonly userLeagueRepository: UserLeagueRepository
    ) { }

    async execute(): Promise<UserLeague[]> {
        return this.userLeagueRepository.getAll();
    }
}
