import express from 'express';
import * as userRolesController from '../controllers/user-roles.mjs';

const userRolesRouter = express.Router();

// GET All User Roles
userRolesRouter.get('/', userRolesController.getAllUserRoles);

// GET Single User Role
userRolesRouter.get('/:userRoleId', userRolesController.getUserRole);

// POST Create User Role
userRolesRouter.post('/', userRolesController.createUserRole);

// PUT Update User Role
userRolesRouter.put('/:userRoleId', userRolesController.updateUserRole);

// DELETE Delete User Role
userRolesRouter.delete('/:userRoleId', userRolesController.deleteUserRole);

export default userRolesRouter;
