/**
 * JSON Web Token Used for Authentication of User
 * Source: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 */

import jwt from 'jsonwebtoken';
import { decryptString } from './encryption.mjs';
import { isAdminUser, isCustomerUser } from './../../global-utils/auth.mjs';

const checkAuthToken = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    return response.sendStatus(401);
  }

  const encryptedToken = authHeader.split(' ')[1];
  const token = decryptString(encryptedToken);

  if (!token) {
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

const checkAdminAuth = (request, response, next) => {
  const userData = request.user.user_data;

  if (!isAdminUser(userData?.user_role_id)) {
    return response.sendStatus(401);
  }

  next();
};

const checkIsCurrentCustomer = (request, response, next) => {
  const userId = request.params.userId;

  if (isCustomerUser(userData?.user_role_id) && userData?.id !== userId) {
    return response.sendStatus(401);
  }

  next();
};

export { checkAuthToken, checkAdminAuth, checkIsCurrentCustomer };
