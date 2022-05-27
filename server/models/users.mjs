import { dbQuery } from '../db/db-connection.mjs';

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

const getUser = async (userId, withPassword = false) => {
  if (!userId) {
    throw 'User Id is a required parameter to get a user';
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

const createUser = async (userRoleId, firstName, lastName, email, addressLine1, addressLine2, city, state, password) => {
  await dbQuery(
    `INSERT INTO users(user_role_id, first_name, last_name, email, address_line_1, address_line_2, city, state,
                       password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userRoleId, firstName, lastName, email, addressLine1, addressLine2, city, state, password],
  );
};

const updateUser = async (userId, userRoleId, firstName, lastName, email, addressLine1, addressLine2, city, state, password) => {
  if (!userId) {
    throw 'User Id is a required parameter to update a user.';
  }

  let userRecord = await getUser(userId, true);
  console.log(userRecord[0]);
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
  const updatedPassword = password || userRecord.password;
  console.log(updatedPassword);

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
    throw 'User Id is a required parameter to delete a book.';
  }

  return await dbQuery('DELETE FROM users WHERE users.id = ?', [userId]);
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
