import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export class GetMembershipsByUserUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) {}

    async execute(userId: string): Promise<UserLeagueMembership[]> {
        return this.membershipRepository.getByUserId(userId);
    }
}
