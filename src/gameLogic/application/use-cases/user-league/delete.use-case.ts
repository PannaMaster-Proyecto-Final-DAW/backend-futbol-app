import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";

export class DeleteUserLeagueUseCase {
    constructor(
        private readonly userLeagueRepository: UserLeagueRepository
    ) { }

    async execute(id: string): Promise<boolean> {
        return this.userLeagueRepository.delete(id);
    }
}
