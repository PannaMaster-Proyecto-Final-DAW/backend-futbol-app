import { UserGameAttempt } from '../entities/user-game-attempt.entity.js';

export interface UserGameAttemptRepository {
  findByUserAndDate(userId: string, gameId: string, date: string): Promise<UserGameAttempt | null>;
  save(attempt: UserGameAttempt): Promise<UserGameAttempt>;
  deleteOlderThan(date: string): Promise<number>;
}
