import { DailyChallengeRepository } from '../../domain/repositories/daily-challenge.repository.js';
import { DailyChallenge } from '../../domain/entities/daily-challenge.entity.js';
import { DailyChallengeModel } from '../models/daily-challenge.model.js';
import { Op } from 'sequelize';

export class DailyChallengeRepositoryImpl implements DailyChallengeRepository {
  async findByDateAndGame(date: string, gameId: string, modeId: string): Promise<DailyChallenge | null> {
    const model = await DailyChallengeModel.findOne({
      where: { date, gameId, modeId }
    });
    
    if (!model) return null;
    
    return {
      date: model.date,
      gameId: model.gameId,
      modeId: model.modeId,
      challengeData: model.challengeData,
    };
  }

  async create(challenge: DailyChallenge): Promise<DailyChallenge> {
    const model = await DailyChallengeModel.create({
      date: challenge.date as string,
      gameId: challenge.gameId,
      modeId: challenge.modeId,
      challengeData: challenge.challengeData,
    });
    
    return {
      date: model.date,
      gameId: model.gameId,
      modeId: model.modeId,
      challengeData: model.challengeData,
    };
  }

  async update(challenge: DailyChallenge): Promise<DailyChallenge> {
    await DailyChallengeModel.update({
      challengeData: challenge.challengeData,
    }, {
      where: {
        date: challenge.date as string,
        gameId: challenge.gameId,
        modeId: challenge.modeId,
      }
    });
    
    return challenge;
  }

  async deleteOlderThan(date: string): Promise<number> {
    return await DailyChallengeModel.destroy({
      where: {
        date: {
          [Op.lt]: date
        }
      }
    });
  }
}
