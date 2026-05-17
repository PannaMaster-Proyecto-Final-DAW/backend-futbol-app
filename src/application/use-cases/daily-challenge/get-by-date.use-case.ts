import { DailyChallenge } from '../../../domain/entities/daily-challenge.entity.js';
import { DailyChallengeRepository } from '../../../domain/repositories/daily-challenge.repository.js';
import { z } from "zod";
import { validateData } from '../../../infrastructure/validation/zod-validator.js';

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD");

export class GetDailyChallengeByDateUseCase {
  constructor(private readonly dailyChallengeRepository: DailyChallengeRepository) {}

  async execute(date: string, gameId: string, modeId: string): Promise<DailyChallenge | null> {
    const validDate = validateData(dateSchema, date);
    return await this.dailyChallengeRepository.findByDateAndGame(validDate, gameId, modeId);
  }
}
