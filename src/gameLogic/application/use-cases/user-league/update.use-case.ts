import { UserLeague } from "../../../domain/entities/userLeague.entity.js";
import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";

export interface UpdateLeagueInput {
    name?: string;
    inviteCode?: string;
}

export class UpdateUserLeagueUseCase {
    constructor(
        private readonly userLeagueRepository: UserLeagueRepository
    ) { }

    async execute(id: string, input: UpdateLeagueInput): Promise<UserLeague> {
        const league = await this.userLeagueRepository.getById(id);
        if (!league) {
            throw new Error('League not found');
        }

        if (input.name !== undefined) {
            league.name = input.name;
        }
        if (input.inviteCode !== undefined) {
            league.inviteCode = input.inviteCode;
        }

        return this.userLeagueRepository.update(league);
    }
}
