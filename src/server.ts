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
import { userRouter } from './gameLogic/infrastructure/routes/user.routes.js';
import { userLeagueRouter } from './gameLogic/infrastructure/routes/user-league.routes.js';
import { userLeagueMembershipRouter } from './gameLogic/infrastructure/routes/user-league-membership.routes.js';

// Soccer Data
import { countryRouter } from "./soccerData/infrastructure/routes/country.routes.js";
import { formationRouter } from "./soccerData/infrastructure/routes/formation.routes.js";
import { leagueRouter } from "./soccerData/infrastructure/routes/league.routes.js";
import { teamRouter } from "./soccerData/infrastructure/routes/team.routes.js";
import { playerRouter } from "./soccerData/infrastructure/routes/player.routes.js";

// Game Logic Endpoints
app.use('/api/user', userRouter);
app.use('/api/user-league', userLeagueRouter);
app.use('/api/user-league-membership', userLeagueMembershipRouter);

// Soccer Data Endpoints
app.use("/api/countries", countryRouter);
app.use("/api/formations", formationRouter);
app.use("/api/leagues", leagueRouter);
app.use("/api/teams", teamRouter);
app.use("/api/players", playerRouter);

app.get('/', (req, res) => {
    res.send('Server is running correctly! 🚀');
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
