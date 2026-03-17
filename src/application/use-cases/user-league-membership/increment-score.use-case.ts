import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export interface IncrementScoreInput {
    membershipId: string;
    pointsToAdd: number;
}

export class IncrementScoreUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) { }

    async execute(input: IncrementScoreInput): Promise<UserLeagueMembership> {
        if (input.pointsToAdd <= 0) {
            throw new Error('Points to add must be greater than 0');
        }

        const membership = await this.membershipRepository.getById(input.membershipId);
        if (!membership) {
            throw new Error(`Membership not found with ID ${input.membershipId}`);
        }

        // Sum the points to the current score
        membership.score += input.pointsToAdd;

        return this.membershipRepository.update(membership);
    }
}
