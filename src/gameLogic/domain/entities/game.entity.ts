export class Game {
    constructor(
        public id: string,
        public date: Date,
        //@QUESTION I don't understand at all why should I use JSON here.
        public content: JSON
    ) { }
}