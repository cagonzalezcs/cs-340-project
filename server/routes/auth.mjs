import express from 'express';
import * as authController from '../controllers/auth.mjs';
import { checkAuthToken } from '../utils/middleware.mjs';

const authRouter = express.Router();

// GET Check for JWT and Get User If Authed
authRouter.get('/', checkAuthToken, authController.checkAuth);

// POST Login User - Create JWT/Session
authRouter.post('/login', authController.loginUser);

// POST Logout User - Invalidate JWT/Session
authRouter.post('/logout', authController.logoutUser);

export default authRouter;
