import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export class GetUserLeagueMembershipByIdUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) {}

    async execute(id: string): Promise<UserLeagueMembership | null> {
        return this.membershipRepository.getById(id);
    }
}
