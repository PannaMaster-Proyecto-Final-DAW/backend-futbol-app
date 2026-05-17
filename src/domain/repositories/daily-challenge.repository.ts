import { DailyChallenge } from '../entities/daily-challenge.entity.js';

export interface DailyChallengeRepository {
  findByDateAndGame(date: string, gameId: string, modeId: string): Promise<DailyChallenge | null>;
  create(challenge: DailyChallenge): Promise<DailyChallenge>;
  update(challenge: DailyChallenge): Promise<DailyChallenge>;
  deleteOlderThan(date: string): Promise<number>;
}
