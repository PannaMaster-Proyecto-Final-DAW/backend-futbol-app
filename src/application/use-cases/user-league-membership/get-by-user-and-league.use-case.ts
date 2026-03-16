import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export class GetMembershipByUserAndLeagueUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) {}

    async execute(userId: string, leagueId: string): Promise<UserLeagueMembership | null> {
        return this.membershipRepository.getByUserIdAndLeagueId(userId, leagueId);
    }
}
