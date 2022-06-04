import express from 'express';
import * as userRolesController from '../controllers/user-roles.mjs';
import { checkAuthToken, checkAdminAuth } from '../utils/middleware.mjs';

const userRolesRouter = express.Router();

// GET All User Roles
userRolesRouter.get('/', checkAuthToken, checkAdminAuth, userRolesController.getAllUserRoles);

// GET Single User Role
userRolesRouter.get('/:userRoleId', checkAuthToken, checkAdminAuth, userRolesController.getUserRole);

// POST Create User Role
userRolesRouter.post('/', checkAuthToken, checkAdminAuth, userRolesController.createUserRole);

// PUT Update User Role
userRolesRouter.put('/:userRoleId', checkAuthToken, checkAdminAuth, userRolesController.updateUserRole);

// DELETE Delete User Role
userRolesRouter.delete('/:userRoleId', checkAuthToken, checkAdminAuth, userRolesController.deleteUserRole);

export default userRolesRouter;
