import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";
import { UserLeagueRepository } from "../../../domain/repositories/user-league.domain.repository.js";
import { UserRepository } from "../../../domain/repositories/user.domain.repositoy.js";
import { UserLeagueMembership } from "../../../domain/entities/user-league-membership.entity.js";

export interface IdGenerator {
    generate(): string;
}

export interface CreateMembershipInput {
    userId: string;
    leagueId: string;
}

export class CreateUserLeagueMembershipUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository,
        private readonly userRepository: UserRepository,
        private readonly leagueRepository: UserLeagueRepository,
        private readonly idGenerator: IdGenerator
    ) {}

    async execute(input: CreateMembershipInput): Promise<UserLeagueMembership> {
        // Verify if user exists
        const user = await this.userRepository.getById(input.userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Verify if league exists
        const league = await this.leagueRepository.getById(input.leagueId);
        if (!league) {
            throw new Error('League not found');
        }

        // Verify if membership already exists
        const existingMembership = await this.membershipRepository.getByUserIdAndLeagueId(input.userId, input.leagueId);
        if (existingMembership) {
            throw new Error('User is already a member of this league');
        }

        // Create new membership (score starts at 0 by default)
        const membership = new UserLeagueMembership(
            this.idGenerator.generate(),
            user,
            league
        );

        return this.membershipRepository.create(membership);
    }
}
