import { UserGameAttemptRepository } from '../../domain/repositories/user-game-attempt.repository.js';
import { UserGameAttempt } from '../../domain/entities/user-game-attempt.entity.js';
import { UserGameAttemptModel } from '../models/user-game-attempt.model.js';
import { Op } from 'sequelize';

export class UserGameAttemptRepositoryImpl implements UserGameAttemptRepository {
  async findByUserAndDate(userId: string, gameId: string, date: string): Promise<UserGameAttempt | null> {
    const model = await UserGameAttemptModel.findOne({
      where: { userId, gameId, date }
    });
    
    if (!model) return null;
    
    return {
      id: model.id,
      userId: model.userId,
      date: model.date,
      gameId: model.gameId,
      modeId: model.modeId,
      score: model.score,
      status: model.status,
      history: model.history,
    };
  }

  async save(attempt: UserGameAttempt): Promise<UserGameAttempt> {
    const [model] = await UserGameAttemptModel.upsert({
      id: attempt.id,
      userId: attempt.userId,
      date: attempt.date as string,
      gameId: attempt.gameId,
      modeId: attempt.modeId,
      score: attempt.score,
      status: attempt.status,
      history: attempt.history,
    });
    
    return {
      id: model.id,
      userId: model.userId,
      date: model.date,
      gameId: model.gameId,
      modeId: model.modeId,
      score: model.score,
      status: model.status,
      history: model.history,
    };
  }

  async deleteOlderThan(date: string): Promise<number> {
    return await UserGameAttemptModel.destroy({
      where: {
        date: {
          [Op.lt]: date
        }
      }
    });
  }
}
