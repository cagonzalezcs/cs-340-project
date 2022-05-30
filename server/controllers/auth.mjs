import jwt from 'jsonwebtoken';
import { encryptString } from '../utils/encryption.mjs';

import * as usersModel from '../models/users.mjs';

const checkAuth = async (request, response) => {
  try {
    const userData = request.user.user_data;

    response.json({message: 'User is authenticated.', user_data: userData});
  } catch (error) {
    response.status(500).json({ error });
  }
};

const loginUser = (request, response) => {
  try {
    const loginData = request.body;

    usersModel.getUserByPassword(loginData.email, loginData.password)
      .then((userRecord) => {
        if (!userRecord) {
          response.status(401).json({ message: 'Unable to log in user with provided credentials.' });
          return;
        }

        const userData = {
          id: userRecord.id,
          user_role_id: userRecord.user_role_id,
          first_name: userRecord.first_name,
          last_name: userRecord.last_name,
          email: userRecord.email,
          address_line_1: userRecord.address_line_1,
          address_line_2: userRecord.address_line_2,
          city: userRecord.city,
          state: userRecord.state,
        };

        jwt.sign({ user_data: userData }, process.env.TOKEN_SECRET, { expiresIn: '24h' }, (error, token) => {
          if (error) {
            response.status(500).json({ error });
          }
          const encryptedToken = encryptString(token);

          response.json({ jwt: encryptedToken, user_data: userData });
        });
      });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const logoutUser = async (request, response) => {
  try {
    request.session.destroy();
    response.json({ message: 'Successfully Logged Out' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export { checkAuth, loginUser, logoutUser };
