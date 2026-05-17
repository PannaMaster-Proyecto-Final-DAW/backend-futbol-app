import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';
import { LeagueModel } from '../models/league.model.js';
import { CountryModel } from '../models/country.model.js';
import { FormationModel } from '../models/formation.model.js';
import { TeamModel } from '../models/team.model.js';
import { UserLeagueModel } from '../models/user-league.model.js';
import { UserLeagueMembershipModel } from '../models/user-league-membership.model.js';
import { PlayerModel } from '../models/player.model.js';
import { DailyChallengeModel } from '../models/daily-challenge.model.js';
import { UserGameAttemptModel } from '../models/user-game-attempt.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    models: [UserModel, LeagueModel, CountryModel, FormationModel, TeamModel, PlayerModel, UserLeagueModel, UserLeagueMembershipModel, DailyChallengeModel, UserGameAttemptModel],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        prepareStatements: false,
    },
});

export const connectDB = async () => {
    try {
        console.log('Attempting to connect to the database...');
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;

