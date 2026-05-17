import { UserGameAttemptRepository } from '../../../domain/repositories/user-game-attempt.repository.js';
import { z } from "zod";
import { validateData } from '../../../infrastructure/validation/zod-validator.js';

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD");

export class DeleteOlderUserGameAttemptsUseCase {
  constructor(private readonly userGameAttemptRepository: UserGameAttemptRepository) {}

  async execute(date: string): Promise<number> {
    const validDate = validateData(dateSchema, date);
    return await this.userGameAttemptRepository.deleteOlderThan(validDate);
  }
}
