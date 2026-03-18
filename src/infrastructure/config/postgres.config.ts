import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';
import { LeagueModel } from '../models/league.model.js';
import { CountryModel } from '../models/country.model.js';

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
    models: [UserModel, LeagueModel, CountryModel],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;

