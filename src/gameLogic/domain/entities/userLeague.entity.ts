import type { User } from "./user.entity.js";

export class UserLeague {
    constructor(
        public id: string,
        public name: string,
        public inviteCode: string,
        public members: User[]
    ) { }
}