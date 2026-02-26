export class UserLeague {
    constructor(
        public id: string,
        public name: string,
        public inviteCode: string
        //@QUESTION Maybe it should be related to a user? 
    ) { }
}