import * as userRolesModel from '../models/user-roles.mjs';

const getAllUserRoles = async (request, response) => {
  try {
    const allUserRoles = await userRolesModel.getAllUserRoles();
    response.json(allUserRoles);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getUserRole = async (request, response) => {
  try {
    const userRoleId = request.params.userRoleId;
    const userRole = await userRolesModel.getUserRole(userRoleId);
    response.json(userRole);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createUserRole = async (request, response) => {
  try {
    const newUserRoleData = request.body;
    await userRolesModel.createUserRole(
      newUserRoleData.type,
    );
    response.json({ message: 'User role has been successfully created.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const updateUserRole = async (request, response) => {
  try {
    const userRoleId = request.params.userRoleId;
    const userRoleData = request.body;

    await userRolesModel.updateUserRole(
      userRoleId,
      userRoleData.type,
    );
    response.json({ message: 'User role has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const deleteUserRole = async (request, response) => {
  try {
    const userRoleId = request.params.userRoleId;
    await userRolesModel.deleteUserRole(userRoleId);
    response.json({ message: 'User role has been successfully deleted' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export { getAllUserRoles, getUserRole, createUserRole, updateUserRole, deleteUserRole };
