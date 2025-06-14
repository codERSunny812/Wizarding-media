import express from 'express';
import { AiResponse } from '../Controller/userAiResponse.controller.js';


const userAiRouter = express.Router();

userAiRouter.post('/generate-content', AiResponse);

export default userAiRouter;
