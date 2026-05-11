import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export class GetMembershipsByLeagueUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) {}

    async execute(leagueId: string): Promise<UserLeagueMembership[]> {
        return this.membershipRepository.getByLeagueId(leagueId);
    }
}
