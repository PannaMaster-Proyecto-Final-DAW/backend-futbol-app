import { v4 as uuidv4 } from 'uuid';
import { InviteCodeGenerator } from "../../application/use-cases/user-league/create.use-case.js";

export class UuidInviteCodeGenerator implements InviteCodeGenerator {
    generate(): string {
        return uuidv4();
    }
}
