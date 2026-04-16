export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export class User {
    constructor(
        public id: string,
        public userName: string,
        public email: string,
        public password: string,
        public role: UserRole
    ) { }
}
