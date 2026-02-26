import type { User } from "./user.entity.js";
import type { Game } from "./game.entity.js";

export class Score {
    constructor(
        public id: string,
        public user: User,
        public game: Game,
        public points: number,
        public createdAt: string
    ) { }
}