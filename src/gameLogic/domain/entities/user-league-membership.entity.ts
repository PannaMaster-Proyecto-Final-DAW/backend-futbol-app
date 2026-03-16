import type { User } from "./user.entity.js";
import type { UserLeague } from "./user-league.entity.js";

export class UserLeagueMembership {
    constructor(
        public id: string, // ID único para esta participación
        public user: User,
        public league: UserLeague,
        public score: number = 0 // Inicializado en 0 por defecto como pediste
    ) { }
}
