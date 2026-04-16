import { v4 as uuidv4 } from 'uuid';
import type { IdGenerator } from '../../application/use-cases/user/create.use-case.js';

export class UuidIdGenerator implements IdGenerator {
    generate(): string {
        return uuidv4();
    }
}
