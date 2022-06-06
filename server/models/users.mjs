import { dbQuery } from '../db/db-connection.mjs';
import { encryptString, decryptString } from '../utils/encryption.mjs';

const getAllUsers = async () => {
  return await dbQuery(
    `SELECT users.id,
            users.user_role_id,
            users.first_name,
            users.last_name,
            users.email,
            users.address_line_1,
            users.address_line_2,
            users.city,
            users.state,
            users.created_at,
            users.updated_at
     FROM users`,
  );
};

const getUserById = async (userId, withPassword = false) => {
  if (!userId) {
    throw 'User id is a required parameter to get a user';
  }

  if (withPassword) {
    return await dbQuery(`SELECT users.id,
                                 users.user_role_id,
                                 users.first_name,
                                 users.last_name,
                                 users.email,
                                 users.address_line_1,
                                 users.address_line_2,
                                 users.city,
                                 users.state,
                                 users.password,
                                 users.password_updated_at,
                                 users.created_at,
                                 users.updated_at
                          FROM users
                          WHERE users.id = ?
                          LIMIT 1`, [userId]);
  }

  return await dbQuery(`SELECT users.id,
                               users.user_role_id,
                               users.first_name,
                               users.last_name,
                               users.email,
                               users.address_line_1,
                               users.address_line_2,
                               users.city,
                               users.state,
                               users.created_at,
                               users.updated_at
                        FROM users
                        WHERE users.id = ?
                        LIMIT 1`, [userId]);
};

const getUserByEmail = async (userEmail, withPassword = false) => {
  if (!userEmail) {
    throw 'User email required to get a user';
  }

  if (withPassword) {
    return await dbQuery(`SELECT users.id,
                                 users.user_role_id,
                                 users.first_name,
                                 users.last_name,
                                 users.email,
                                 users.address_line_1,
                                 users.address_line_2,
                                 users.city,
                                 users.state,
                                 users.password,
                                 users.password_updated_at,
                                 users.created_at,
                                 users.updated_at
                          FROM users
                          WHERE users.email = ?
                          LIMIT 1`, [userEmail]);
  }

  return await dbQuery(`SELECT users.id,
                               users.user_role_id,
                               users.first_name,
                               users.last_name,
                               users.email,
                               users.address_line_1,
                               users.address_line_2,
                               users.city,
                               users.state
                        FROM users
                        WHERE users.email = ?
                        LIMIT 1`, [userEmail]);
};

const getUserByPassword = async (userEmail, userPassword) => {
  if (!userEmail || !userPassword) {
    throw 'User email and user password required to get a user';
  }

  let foundUser = await getUserByEmail(userEmail, true);
  foundUser = foundUser[0];

  if (!foundUser) {
    return;
  }

  const decryptedPassword = decryptString(foundUser.password);
  if (decryptedPassword !== userPassword) {
    return;
  }

  return foundUser;
};

const createUser = async (userRoleId, firstName, lastName, email, addressLine1, addressLine2, city, state, password) => {
  const encryptedPassword = encryptString(password);

  await dbQuery(
    `INSERT INTO users(user_role_id, first_name, last_name, email, address_line_1, address_line_2, city, state,
                       password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userRoleId, firstName, lastName, email, addressLine1, addressLine2, city, state, encryptedPassword],
  );
};

const updateUser = async (userId, userRoleId, firstName, lastName, email, addressLine1, addressLine2, city, state, password) => {
  if (!userId) {
    throw 'User id is a required parameter to update a user.';
  }

  let userRecord = await getUserById(userId, true);
  userRecord = userRecord[0];
  if (!userRecord) {
    throw 'User not found, unable to update user';
  }

  const updatedUserRoleId = userRoleId || userRecord.user_role_id;
  const updatedFirstName = firstName || userRecord.first_name;
  const updatedLastName = lastName || userRecord.last_name;
  const updatedEmail = email || userRecord.email;
  const updatedAddressLine1 = addressLine1 || userRecord.address_line_1;
  const updatedAddressLine2 = addressLine2 || userRecord.address_line_2;
  const updatedCity = city || userRecord.city;
  const updatedState = state || userRecord.state;
  const updatedPassword = password ? encryptString(password) : userRecord.password;

  await dbQuery(
    `UPDATE users
     SET users.user_role_id   = ?,
         users.first_name     = ?,
         users.last_name      = ?,
         users.email          = ?,
         users.address_line_1 = ?,
         users.address_line_2 = ?,
         users.city           = ?,
         users.state          = ?,
         users.password       = ?
     WHERE users.id = ?`,
    [
      updatedUserRoleId,
      updatedFirstName,
      updatedLastName,
      updatedEmail,
      updatedAddressLine1,
      updatedAddressLine2,
      updatedCity,
      updatedState,
      updatedPassword,
      userId,
    ],
  );
};

const deleteUser = async (userId) => {
  if (!userId) {
    throw 'User id is a required parameter to delete a user.';
  }

  return await dbQuery('DELETE FROM users WHERE users.id = ?', [userId]);
};

export { getAllUsers, getUserById, getUserByEmail, getUserByPassword, createUser, updateUser, deleteUser };
