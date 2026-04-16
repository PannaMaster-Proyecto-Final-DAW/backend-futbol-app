import bcrypt from 'bcryptjs';
import type { PasswordHasher } from '../../application/use-cases/user/create.use-case.js';

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}
