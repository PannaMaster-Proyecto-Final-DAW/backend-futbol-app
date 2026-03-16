import 'reflect-metadata'; // @QUESTION
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './infrastructure/config/postgres.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes
// Game Logic
import { userRouter } from './infrastructure/routes/user.routes.js';
import { userLeagueRouter } from './infrastructure/routes/user-league.routes.js';
import { userLeagueMembershipRouter } from './infrastructure/routes/user-league-membership.routes.js';

// Soccer Data
import { countryRouter } from "./infrastructure/routes/country.routes.js";
import { formationRouter } from "./infrastructure/routes/formation.routes.js";
import { leagueRouter } from "./infrastructure/routes/league.routes.js";
import { teamRouter } from "./infrastructure/routes/team.routes.js";
import { playerRouter } from "./infrastructure/routes/player.routes.js";

// Game Logic Endpoints
app.use('/api/user', userRouter);
app.use('/api/user-league', userLeagueRouter);
app.use('/api/user-league-membership', userLeagueMembershipRouter);

// Soccer Data Endpoints
app.use("/api/country", countryRouter);
app.use("/api/formation", formationRouter);
app.use("/api/league", leagueRouter);
app.use("/api/team", teamRouter);
app.use("/api/player", playerRouter);

app.get('/', (req, res) => {
    res.send('Server is running correctly! 🚀');
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
