import type { UserLeagueMembership } from "./userLeagueMembership.entity.js";

export class UserLeague {
    constructor(
        public id: string,
        public name: string,
        public inviteCode: string,
        public members: UserLeagueMembership[]
    ) { }
}