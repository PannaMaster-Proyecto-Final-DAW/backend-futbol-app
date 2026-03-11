import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";
import { UserLeague } from "../../../domain/entities/userLeague.entity.js";

export class GetUserLeagueByIdUseCase {
    constructor(
        private readonly userLeagueRepository: UserLeagueRepository
    ) { }

    async execute(id: string): Promise<UserLeague | null> {
        return this.userLeagueRepository.getById(id);
    }
}
