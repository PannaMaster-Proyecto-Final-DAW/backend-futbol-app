import { randomUUID } from "node:crypto";
import { IdGenerator } from "../../application/use-cases/country/create.use-case.js";

export class UuidGenerator implements IdGenerator {
    generateId(): string {
        return randomUUID();
    }
}
