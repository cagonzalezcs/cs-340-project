import express from 'express';
import { checkAdminAuth, checkAuthToken, checkIsCurrentCustomer } from '../utils/middleware.mjs';
import * as usersController from '../controllers/users.mjs';

const usersRouter = express.Router();

// Get All Users
usersRouter.get('/', checkAuthToken, checkAdminAuth, usersController.getAllUsers);

// GET Single User by ID
usersRouter.get('/:userId', checkAuthToken, checkAdminAuth, checkIsCurrentCustomer, usersController.getUserById);

// POST Create User
usersRouter.post('/', checkAuthToken, checkAdminAuth, usersController.createUser);

// POST Register User
usersRouter.post('/register', usersController.registerUser)

// PUT Update User
usersRouter.put('/:userId', checkAuthToken, checkAdminAuth, checkIsCurrentCustomer, usersController.updateUser);

// DELETE Delete User
usersRouter.delete('/:userId', checkAuthToken, checkAdminAuth, usersController.deleteUser);

export default usersRouter;
