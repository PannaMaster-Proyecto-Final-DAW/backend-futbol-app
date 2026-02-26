export class Game {
    constructor(
        public id: string,
        public date: string,
        public currentStreak: number,
        //@QUESTION I don't understand at all why should I use JSON here.
        public content: JSON
    ) { }
}