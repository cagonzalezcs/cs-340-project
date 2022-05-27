import { dbQuery } from '../db/db-connection.mjs';

const getAllUserRoles = async () => {
  return await dbQuery(
    `SELECT *
     FROM user_roles`,
  );
};

const getUserRole = async (userRoleId) => {
  if (!userRoleId) {
    throw 'User role id is a required parameter to get a user role';
  }

  return await dbQuery(
    `SELECT *
     FROM user_roles
     WHERE user_roles.id = ?
     LIMIT 1`,
    [userRoleId],
  );
};

const createUserRole = async (roleType) => {
  await dbQuery(
    `INSERT INTO user_roles(type)
     VALUES (?)`,
    [roleType],
  );
};

const updateUserRole = async (userRoleId, roleType) => {
  if (!userRoleId) {
    throw 'User role id is a required parameter to update a user role.';
  }

  let userRoleRecord = await getUserRole(userRoleId);
  userRoleRecord = userRoleRecord[0];
  if (!userRoleRecord) {
    throw 'User role not found, update to update user';
  }

  const updatedUserRoleType = roleType || userRoleRecord.type;

  await dbQuery(
    `UPDATE user_roles
     SET user_roles.type = ?
     WHERE user_roles.id = ?`,
    [updatedUserRoleType, userRoleId],
  );
};

const deleteUserRole = async (userRoleId) => {
  if (!userRoleId) {
    throw 'User role id is a required parameter to delete a user role.';
  }

  return await dbQuery('DELETE FROM user_roles WHERE user_roles.id = ?', [userRoleId]);
};

export { getAllUserRoles, getUserRole, createUserRole, updateUserRole, deleteUserRole };
