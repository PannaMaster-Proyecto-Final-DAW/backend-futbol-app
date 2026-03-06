import 'reflect-metadata';
import express from 'express';
// import { connectDB } from './infrastructure/config/postgres.config.js'; // TODO: Create database config

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Routes
import { userRouter } from './gameLogic/infrastructure/routes/user.routes.js';

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Server is running correctly! 🚀');
});

app.listen(PORT, async () => {
    // await connectDB(); // TODO: Uncomment when database config is ready
    console.log(`Server running on: http://localhost:${PORT}`);
});
