import { UserGameAttempt } from '../../../domain/entities/user-game-attempt.entity.js';
import { UserGameAttemptRepository } from '../../../domain/repositories/user-game-attempt.repository.js';
import { z } from "zod";
import { validateData } from '../../../infrastructure/validation/zod-validator.js';

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD");
const uuidSchema = z.string().uuid("Invalid user ID format");

export class GetUserGameAttemptByDateUseCase {
  constructor(private readonly userGameAttemptRepository: UserGameAttemptRepository) {}

  async execute(userId: string, gameId: string, date: string): Promise<UserGameAttempt | null> {
    const validDate = validateData(dateSchema, date);
    const validUserId = validateData(uuidSchema, userId);
    return await this.userGameAttemptRepository.findByUserAndDate(validUserId, gameId, validDate);
  }
}
