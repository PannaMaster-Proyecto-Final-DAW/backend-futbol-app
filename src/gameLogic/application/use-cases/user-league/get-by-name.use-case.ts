import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";
import { UserLeague } from "../../../domain/entities/userLeague.entity.js";

export class GetUserLeagueByNameUseCase {
    constructor(
        private readonly userLeagueRepository: UserLeagueRepository
    ) { }

    async execute(name: string): Promise<UserLeague | null> {
        return this.userLeagueRepository.getByName(name);
    }
}
