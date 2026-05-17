import { DailyChallenge } from '../../../domain/entities/daily-challenge.entity.js';
import { DailyChallengeRepository } from '../../../domain/repositories/daily-challenge.repository.js';
import { createDailyChallengeSchema } from '../../../infrastructure/validation/schemas/daily-challenge.schema.js';
import { validateData } from '../../../infrastructure/validation/zod-validator.js';

export interface CreateDailyChallengeInput {
  date: string;
  gameId: string;
  modeId: string;
  challengeData: any;
}

export class CreateDailyChallengeUseCase {
  constructor(private readonly dailyChallengeRepository: DailyChallengeRepository) {}

  async execute(input: CreateDailyChallengeInput): Promise<DailyChallenge> {
    const validData = validateData(createDailyChallengeSchema, input);
    
    // Check if it already exists
    const existing = await this.dailyChallengeRepository.findByDateAndGame(
      validData.date, 
      validData.gameId, 
      validData.modeId
    );
    
    if (existing) {
      throw new Error(`Daily challenge for game ${validData.gameId} and mode ${validData.modeId} already exists on ${validData.date}`);
    }

    const challenge: DailyChallenge = {
      date: validData.date,
      gameId: validData.gameId,
      modeId: validData.modeId,
      challengeData: validData.challengeData,
    };

    return await this.dailyChallengeRepository.create(challenge);
  }
}
