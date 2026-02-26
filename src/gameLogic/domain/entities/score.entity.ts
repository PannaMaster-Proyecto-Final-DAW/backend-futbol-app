import type { User } from "./user.entity.js";

export class Score {
    constructor(
        public id: string,
        public user: User,

        // @QUESTION: Why do I need this attribute?
        // public challengeId: string,

        public points: number,
        //@QUESTION Why should I use Date here?
        public createdAt: Date
    ) { }
}