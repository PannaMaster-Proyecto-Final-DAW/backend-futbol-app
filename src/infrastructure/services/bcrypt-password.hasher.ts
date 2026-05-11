import bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../application/interfaces/password-hasher.interface.js';

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plain, hashed);
    }
}
