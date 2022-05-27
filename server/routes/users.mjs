import express from 'express';
import * as usersController from '../controllers/users.mjs';

const usersRouter = express.Router();

// Get All Users
usersRouter.get('/', usersController.getAllUsers);

// GET Single User by ID
usersRouter.get('/:userId', usersController.getUser);

// POST Register/Create User
usersRouter.post('/', usersController.createUser);

// PUT Update User
usersRouter.put('/:userId', usersController.updateUser);

// DELETE Delete User
usersRouter.delete('/:userId', usersController.deleteUser);

export default usersRouter;
