import { v4 as uuidv4 } from 'uuid';
import { IdGenerator } from '../../application/interfaces/id-generator.interface.js';

export class UuidIdGenerator implements IdGenerator {
    generate(): string {
        return uuidv4();
    }
}
