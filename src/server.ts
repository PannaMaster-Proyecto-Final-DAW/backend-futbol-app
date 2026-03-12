import 'reflect-metadata'; // @QUESTION
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
// import { connectDB } from './infrastructure/config/postgres.config.js'; // TODO: Create database config

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes
import { userRouter } from './gameLogic/infrastructure/routes/user.routes.js';
import { countryRouter } from "./soccerData/infrastructure/routes/country.routes.js";
import { formationRouter } from "./soccerData/infrastructure/routes/formation.routes.js";
import { leagueRouter } from "./soccerData/infrastructure/routes/league.routes.js";
import { teamRouter } from "./soccerData/infrastructure/routes/team.routes.js";

app.use('/api/user', userRouter);
app.use("/api/countries", countryRouter);
app.use("/api/formations", formationRouter);
app.use("/api/countries", countryRouter);
app.use("/api/leagues", leagueRouter);
app.use("/api/teams", teamRouter);

app.get('/', (req, res) => {
    res.send('Server is running correctly! 🚀');
});

app.listen(PORT, async () => {
    // await connectDB(); // TODO: Uncomment when database config is ready
    console.log(`Server running on port ${PORT}`);
});
