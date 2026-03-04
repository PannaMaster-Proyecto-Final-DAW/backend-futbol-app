export class User {
    constructor(
        public id: string,
        public userName: string,
        public email: string,
        public password: string,
        public lastPlayedAt: string
    ) { }
}