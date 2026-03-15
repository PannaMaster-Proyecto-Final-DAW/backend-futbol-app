import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export interface UpdateMembershipInput {
    id: string;
    score: number;
}

export class UpdateUserLeagueMembershipUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) {}

    async execute(input: UpdateMembershipInput): Promise<UserLeagueMembership | null> {
        const membership = await this.membershipRepository.getById(input.id);
        
        if (!membership) {
            throw new Error('Membership not found');
        }

        // Update properties
        membership.score = input.score;

        return this.membershipRepository.update(membership);
    }
}
