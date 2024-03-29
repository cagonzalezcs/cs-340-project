import * as usersModel from '../models/users.mjs';

const getAllUsers = async (request, response) => {
  try {
    const allUsers = await usersModel.getAllUsers();
    response.json(allUsers);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getUserById = async (request, response) => {
  try {
    const userId = request.params.userId;
    const user = await usersModel.getUserById(userId);
    response.json(user);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createUser = async (request, response) => {
  try {
    const newUserData = request.body;
    await usersModel.createUser(
      newUserData.user_role_id,
      newUserData.first_name,
      newUserData.last_name,
      newUserData.email,
      newUserData.address_line_1,
      newUserData.address_line_2,
      newUserData.city,
      newUserData.state,
      newUserData.password,
    );
    response.json({ message: 'User has been successfully created.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const registerUser = async (request, response) => {
  try {
    const newUserData = request.body;

    const existingUser = await usersModel.getUserByEmail(newUserData.email);

    if (existingUser.length) {
      return response.status(422).json({ message: 'A user with that email already exists, try a different email address.' });
    }

    await usersModel.createUser(
      4,
      newUserData.first_name,
      newUserData.last_name,
      newUserData.email,
      newUserData.address_line_1,
      newUserData.address_line_2,
      newUserData.city,
      newUserData.state,
      newUserData.password,
    );
    response.json({ message: 'User has been successfully registered.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const updateUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    const userData = request.body;

    await usersModel.updateUser(
      userId,
      userData.user_role_id,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.address_line_1,
      userData.address_line_2,
      userData.city,
      userData.state,
      userData.password,
    );
    response.json({ message: 'User has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const deleteUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    await usersModel.deleteUser(userId);
    response.json({ message: 'User has been successfully deleted' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export { getAllUsers, getUserById, createUser, registerUser, updateUser, deleteUser };
