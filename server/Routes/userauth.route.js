import express from 'express';
import { signup, login } from '../Controller/user.controller.js';

const userAuthRouter = express.Router();

userAuthRouter.post('/signup', signup);
userAuthRouter.post('/login', login);

export default userAuthRouter;
