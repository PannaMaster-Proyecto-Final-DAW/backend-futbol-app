import { UserLeagueMembershipRepository } from "../../../domain/repositories/user-league-membership.domain.repository.js";

export class DeleteUserLeagueMembershipUseCase {
    constructor(
        private readonly membershipRepository: UserLeagueMembershipRepository
    ) {}

    async execute(id: string): Promise<boolean> {
        return this.membershipRepository.delete(id);
    }
}
