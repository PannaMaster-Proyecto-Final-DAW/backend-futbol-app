import { UserGameAttempt, AttemptStatus } from '../../../domain/entities/user-game-attempt.entity.js';
import { UserGameAttemptRepository } from '../../../domain/repositories/user-game-attempt.repository.js';
import { saveUserGameAttemptSchema } from '../../../infrastructure/validation/schemas/user-game-attempt.schema.js';
import { validateData } from '../../../infrastructure/validation/zod-validator.js';

export interface IdGenerator {
    generate(): string;
}

export interface SaveUserGameAttemptInput {
  id?: string;
  userId: string;
  date: string;
  gameId: string;
  modeId: string;
  score: number;
  status: AttemptStatus;
  history?: any;
}

export class SaveUserGameAttemptUseCase {
  constructor(
    private readonly userGameAttemptRepository: UserGameAttemptRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(input: SaveUserGameAttemptInput): Promise<UserGameAttempt> {
    const validData = validateData(saveUserGameAttemptSchema, input);
    
    // Check if user already has an attempt for this date and game
    const existing = await this.userGameAttemptRepository.findByUserAndDate(
      validData.userId,
      validData.gameId,
      validData.date
    );

    let finalId = validData.id;

    if (existing) {
      if (!validData.id) {
          finalId = existing.id;
      } else if (validData.id !== existing.id) {
          throw new Error("Attempt ID mismatch. User already has an attempt for this day.");
      }
    } else {
      if (!finalId) {
        finalId = this.idGenerator.generate();
      }
    }

    const attempt: UserGameAttempt = {
      id: finalId!,
      userId: validData.userId,
      date: validData.date,
      gameId: validData.gameId,
      modeId: validData.modeId,
      score: validData.score,
      status: validData.status,
      history: validData.history,
    };

    return await this.userGameAttemptRepository.save(attempt);
  }
}
