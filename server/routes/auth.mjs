import express from 'express';
import jwt from 'jsonwebtoken';
import { cookieOptions } from '../utils/cookies.mjs';

const authRouter = express.Router();

// GET Check for JWT and Get User If Authed
authRouter.get('/', async (request, response) => {
  try {
    // Check if jwt exists in session or cookie

    // If jwt exists, get userName from session or cookie and send with jwt to client

    // If neither exists, send back a 401 to redirect user in client
  } catch (error) {
    response.status(500).json({ error });
  }
});

// POST Login User - Create JWT/Session
authRouter.post('/login', async (request, response) => {
  try {
    const loginData = request.body;

    // Encrypt login Password

    // Find User that matches email and encrypted password

    // If user not found, return 401 code

    // If user found, generate jwt token

    // Store JWT in cookie and send to client


    response.json({ jwt: 'jwt' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

// POST Logout User - Invalidate JWT/Session
authRouter.post('/logout', async (request, response) => {
  try {
    response.clearCookie('jwt');
    request.session.destroy();
    response.json({ message: 'Successfully Logged oOut' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default authRouter;
