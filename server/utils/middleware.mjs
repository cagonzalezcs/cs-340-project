/**
 * JSON Web Token Used for Authentication of User
 * Source: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 */

import jwt from 'jsonwebtoken';

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return response.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, { maxAge: '24h'}, (error, user) => {
    if (error) {
      return response.sendStatus(403);
    }

    request.user = user;

    next();
  });
};

const checkAdminAuthentication = (request, response, next) => {
  const user = request.user;

  if (user?.user_role_id !== 1) {
    return response.sendStatus(401);
  }

  next();
};

export { authenticateToken };
