export class User {
    constructor(
        public id: string,
        public userName: string,
        //@QUESTION Which type should I use for the date? I'm not sure if Date is the best option.
        public lastPlayedAt: string
    ) { }
}