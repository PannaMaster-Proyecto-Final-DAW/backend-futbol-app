import cron from 'node-cron';
import { Op } from 'sequelize';
import sequelize from '../config/postgres.config.js';
import DailyChallengeModel from '../models/daily-challenge.model.js';
import UserGameAttemptModel from '../models/user-game-attempt.model.js';
import PlayerModel from '../models/player.model.js';
import TeamModel from '../models/team.model.js';
import LeagueModel from '../models/league.model.js';
import CountryModel from '../models/country.model.js';
import FormationModel from '../models/formation.model.js';
import { PlayerMapper } from '../mappers/player.mapper.js';
import { TeamMapper } from '../mappers/team.mapper.js';

// Get today's date formatted as YYYY-MM-DD in Europe/Madrid timezone
export function getMadridDateString(date: Date = new Date()): string {
  return date.toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' });
}

// Sub-generator for Guess the Player
async function generateGuessThePlayer(dateStr: string, modeId: string): Promise<any> {
  const parts = modeId.split('-');
  const gender = parts[0]; // 'male', 'female', 'both'
  const difficulty = parts[1]; // 'easy', 'intermediate', 'hard'

  // Map difficulty to tier
  let tierFilter: any;
  if (difficulty === 'easy') {
    tierFilter = 1;
  } else if (difficulty === 'intermediate') {
    tierFilter = [1, 2];
  } else {
    tierFilter = 2;
  }

  // 30 Days No-Repeat filter
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = getMadridDateString(thirtyDaysAgo);

  const recentChallenges = await DailyChallengeModel.findAll({
    where: {
      gameId: 'guess-the-player',
      date: {
        [Op.gte]: thirtyDaysAgoStr
      }
    }
  });

  const excludedPlayerIds = recentChallenges
    .map(c => c.challengeData?.id)
    .filter(Boolean);

  // Construct query options
  const whereClause: any = {
    tier: tierFilter
  };

  if (gender === 'male' || gender === 'female') {
    whereClause.gender = gender;
  }

  if (excludedPlayerIds.length > 0) {
    whereClause.id = {
      [Op.notIn]: excludedPlayerIds
    };
  }

  // Find random player matching conditions
  let player = await PlayerModel.findOne({
    where: whereClause,
    include: [
      {
        model: TeamModel,
        include: [LeagueModel]
      },
      CountryModel
    ],
    order: sequelize.random()
  });

  // If no players are found (all were excluded or DB is empty), fallback by ignoring exclusion
  if (!player && excludedPlayerIds.length > 0) {
    delete whereClause.id;
    player = await PlayerModel.findOne({
      where: whereClause,
      include: [
        {
          model: TeamModel,
          include: [LeagueModel]
        },
        CountryModel
      ],
      order: sequelize.random()
    });
  }

  if (!player) {
    throw new Error(`No players found in database for mode ${modeId}`);
  }

  // Map to correct frontend DTO
  return PlayerMapper.toResponse(player as any);
}

// Sub-generator for 11 Clubs
async function generate11Clubs(dateStr: string, modeId: string): Promise<any> {
  const parts = modeId.split('-');
  const gender = parts[0]; // 'male', 'female', 'both'
  const difficulty = parts[1]; // 'easy', 'intermediate', 'hard'

  // Map difficulty to tier
  let tierFilter: any;
  if (difficulty === 'easy') {
    tierFilter = 1;
  } else if (difficulty === 'intermediate') {
    tierFilter = [1, 2];
  } else {
    tierFilter = 2;
  }

  // Find random formation
  let formation = await FormationModel.findOne({
    order: sequelize.random()
  });

  // Fallback formation in case formation table is empty
  if (!formation) {
    formation = {
      id: 'fallback-4-3-3',
      name: '4-3-3',
      goalkeeper: 'GK',
      defenders: ['CB', 'CB', 'LB', 'RB'],
      midfielders: ['CM', 'CM', 'CAM'],
      forwards: ['ST', 'LW', 'RW']
    } as any;
  }

  let selectedTeams: TeamModel[] = [];

  if (gender === 'both') {
    // Random split: 5 male + 6 female OR 6 male + 5 female
    const numMale = Math.random() > 0.5 ? 5 : 6;
    const numFemale = 11 - numMale;

    const maleTeams = await TeamModel.findAll({
      where: { tier: tierFilter },
      include: [
        {
          model: LeagueModel,
          where: { category: 'male' },
          include: [CountryModel]
        }
      ],
      order: sequelize.random(),
      limit: numMale
    });

    const femaleTeams = await TeamModel.findAll({
      where: { tier: tierFilter },
      include: [
        {
          model: LeagueModel,
          where: { category: 'female' },
          include: [CountryModel]
        }
      ],
      order: sequelize.random(),
      limit: numFemale
    });

    selectedTeams = [...maleTeams, ...femaleTeams];

    // Shuffle the combined array in memory to mix genders
    selectedTeams.sort(() => Math.random() - 0.5);
  } else {
    // Single gender category
    selectedTeams = await TeamModel.findAll({
      where: { tier: tierFilter },
      include: [
        {
          model: LeagueModel,
          where: { category: gender },
          include: [CountryModel]
        }
      ],
      order: sequelize.random(),
      limit: 11
    });
  }

  if (selectedTeams.length < 11) {
    // Fallback: if not enough teams match, search all teams regardless of tier
    const missingCount = 11 - selectedTeams.length;
    const fallbackTeams = await TeamModel.findAll({
      include: [
        {
          model: LeagueModel,
          where: gender === 'both' ? {} : { category: gender },
          include: [CountryModel]
        }
      ],
      where: {
        id: { [Op.notIn]: selectedTeams.map(t => t.id) }
      },
      order: sequelize.random(),
      limit: missingCount
    });
    selectedTeams = [...selectedTeams, ...fallbackTeams];
  }

  if (selectedTeams.length < 11) {
    throw new Error(`Not enough teams in database to select 11 clubs for mode ${modeId}`);
  }

  // Format teams using TeamMapper
  const teamsData = selectedTeams.map(t => TeamMapper.toResponse(t as any));

  return {
    formation: {
      id: formation!.id,
      name: formation!.name,
      goalkeeper: formation!.goalkeeper,
      defenders: formation!.defenders,
      midfielders: formation!.midfielders,
      forwards: formation!.forwards
    },
    teams: teamsData
  };
}

// Generate challenges for a specific date
export async function runChallengeGeneration(dateStr: string) {
  console.log(`[Cron] Starting daily challenge generation for date: ${dateStr}...`);

  const games = ['guess-the-player', '11clubs'];
  const genders = ['male', 'female', 'both'];
  const difficulties = ['easy', 'intermediate', 'hard'];

  for (const gameId of games) {
    for (const gender of genders) {
      for (const difficulty of difficulties) {
        const modeId = `${gender}-${difficulty}`;
        try {
          // Check if it already exists
          const existing = await DailyChallengeModel.findOne({
            where: { date: dateStr, gameId, modeId }
          });

          if (existing) {
            console.log(`[Cron] Challenge already exists for ${dateStr} / ${gameId} / ${modeId}. Skipping.`);
            continue;
          }

          let challengeData: any;
          if (gameId === 'guess-the-player') {
            challengeData = await generateGuessThePlayer(dateStr, modeId);
          } else {
            challengeData = await generate11Clubs(dateStr, modeId);
          }

          await DailyChallengeModel.create({
            date: dateStr,
            gameId,
            modeId,
            challengeData
          });

          console.log(`[Cron] Created challenge for ${dateStr} / ${gameId} / ${modeId}`);
        } catch (error: any) {
          console.error(`[Cron] Error generating challenge for ${dateStr} / ${gameId} / ${modeId}:`, error?.message || error);
        }
      }
    }
  }
}

// Clean up old attempts and outdated challenges
export async function runDatabaseCleanup(todayStr: string) {
  console.log(`[Cron] Starting database cleanup relative to today: ${todayStr}...`);
  try {
    // 1. Delete all user game attempts that are older than today (date < todayStr)
    const deletedAttempts = await UserGameAttemptModel.destroy({
      where: {
        date: {
          [Op.lt]: todayStr
        }
      }
    });
    console.log(`[Cron] Deleted ${deletedAttempts} user game attempts older than ${todayStr}`);

    // 2. Delete daily challenges older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = getMadridDateString(thirtyDaysAgo);

    const deletedChallenges = await DailyChallengeModel.destroy({
      where: {
        date: {
          [Op.lt]: thirtyDaysAgoStr
        }
      }
    });
    console.log(`[Cron] Deleted ${deletedChallenges} daily challenges older than ${thirtyDaysAgoStr}`);
  } catch (error: any) {
    console.error(`[Cron] Error performing database cleanup:`, error?.message || error);
  }
}

// Main Cron Scheduling Initialization
export function initDailyChallengeCron() {
  console.log('[Cron] Initializing Daily Challenge system scheduler...');

  // Schedule to run every day at 00:00 CET/CEST (Europe/Madrid timezone)
  cron.schedule('0 0 * * *', async () => {
    const todayStr = getMadridDateString();
    console.log(`[Cron] Midnight scheduler triggered for CET date: ${todayStr}`);
    await runChallengeGeneration(todayStr);
    await runDatabaseCleanup(todayStr);
  }, {
    timezone: 'Europe/Madrid'
  });

  // Self-healing Startup Run: check if today's challenges exist, otherwise generate them!
  const todayStr = getMadridDateString();
  console.log(`[Cron] Running self-healing startup check for date: ${todayStr}...`);
  runChallengeGeneration(todayStr)
    .then(() => runDatabaseCleanup(todayStr))
    .then(() => console.log('[Cron] Startup check completed successfully.'))
    .catch(err => console.error('[Cron] Startup check error:', err));
}
