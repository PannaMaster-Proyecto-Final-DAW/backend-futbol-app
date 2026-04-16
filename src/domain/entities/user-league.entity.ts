import type { UserLeagueMembership } from "./user-league-membership.entity.js";

export class UserLeague {
    constructor(
        public id: string,
        public name: string,
        public inviteCode: string,
        public members: UserLeagueMembership[]
    ) { }
}
