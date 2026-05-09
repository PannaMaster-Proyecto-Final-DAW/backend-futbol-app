import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: false
    }
});

async function run() {
    console.log('Attempting to connect with pg.Client (Port 6543, SSL)...');
    try {
        await client.connect();
        console.log('Connected successfully!');
        const res = await client.query('SELECT 1+1 AS result');
        console.log('Query result:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('Connection error:', err);
    }
}

run();
