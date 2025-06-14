import express from 'express';
import cors from 'cors';
import connectDB from './Db/Db.js';
import userAuthRouter from './Routes/userauth.route.js';
import userAiRouter from './Routes/AiResponse.route.js';
import dotenv from 'dotenv';
dotenv.config();


connectDB();


const app = express();
app.use(cors({
    origin:"http://localhost:8080"
}));
app.use(express.json());

app.use('/api/v1/auth/user', userAuthRouter);
app.use('/api/v1/ai-response', userAiRouter);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
