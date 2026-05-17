import { DailyChallenge } from '../../../domain/entities/daily-challenge.entity.js';
import { DailyChallengeRepository } from '../../../domain/repositories/daily-challenge.repository.js';
import { updateDailyChallengeSchema } from '../../../infrastructure/validation/schemas/daily-challenge.schema.js';
import { validateData } from '../../../infrastructure/validation/zod-validator.js';

export interface UpdateDailyChallengeInput {
  date: string;
  gameId: string;
  modeId: string;
  challengeData: any;
}

export class UpdateDailyChallengeUseCase {
  constructor(private readonly dailyChallengeRepository: DailyChallengeRepository) {}

  async execute(input: UpdateDailyChallengeInput): Promise<DailyChallenge> {
    const validData = validateData(updateDailyChallengeSchema, { challengeData: input.challengeData });
    
    const existing = await this.dailyChallengeRepository.findByDateAndGame(
      input.date, 
      input.gameId, 
      input.modeId
    );
    
    if (!existing) {
      throw new Error(`Daily challenge not found for game ${input.gameId} and mode ${input.modeId} on ${input.date}`);
    }

    const updatedChallenge: DailyChallenge = {
      date: input.date,
      gameId: input.gameId,
      modeId: input.modeId,
      challengeData: validData.challengeData,
    };

    return await this.dailyChallengeRepository.update(updatedChallenge);
  }
}
