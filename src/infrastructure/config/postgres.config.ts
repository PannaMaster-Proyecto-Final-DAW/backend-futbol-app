import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

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
    models: [path.join(__dirname, '..', 'models')],
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully 🚀');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
