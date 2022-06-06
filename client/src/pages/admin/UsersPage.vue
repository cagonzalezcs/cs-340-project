<script setup>
import { reactive, onMounted, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import AddUserForm from '../../components/users/AddUserForm.vue';
import UpdateUserForm from '../../components/users/UpdateUserForm.vue';
import DeleteUserForm from '../../components/users/DeleteUserForm.vue';
import UserWishList from '../../components/users/UserWishList.vue';
import UserRentalList from '../../components/users/UserRentalList.vue';
import { getAuthToken } from '../../utils/cookies';

onMounted(async () => {
  await checkUserIsAdmin();
  await getUsers();
  await getUserRoles();
});

let state = reactive({
  isAddUserModalActive: false,
  isUpdateUserModalActive: false,
  isDeleteUserModalActive: false,
  isUserWishListModalActive: false,
  isUserRentalListModalActive: false,
  users: [],
  userRoles: [],
  currentlySelectedUserIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleAddUserModal = () => {
  state.isAddUserModalActive = !state.isAddUserModalActive;
};
const toggleUpdateUserModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedUserIndex = userIndex;
  }

  state.isUpdateUserModalActive = !state.isUpdateUserModalActive;
};
const toggleDeleteUserModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedUserIndex = userIndex;
  }

  state.isDeleteUserModalActive = !state.isDeleteUserModalActive;
};
const toggleUserWishListModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedUserIndex = userIndex;
  }

  state.isUserWishListModalActive = !state.isUserWishListModalActive;
};
const toggleUserRentalListModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedUserIndex = userIndex;
  }

  state.isUserRentalListModalActive = !state.isUserRentalListModalActive;
};

const setUsers = (users) => {
  if (!users?.length) {
    return;
  }

  state.users = users;
};

const setUserRoles = (userRoles) => {
  if (!userRoles?.length) {
    return;
  }

  state.userRoles = userRoles;
};

const getUsers = async () => {
  const usersUrl = `${ baseUrl }users`;
  try {
    const response = await fetch(usersUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }
    setUsers(data);
  } catch (error) {
    console.error(error);
  }
};

const getUserRoles = async () => {
  const userRolesUrl = `${ baseUrl }user-roles`;
  try {
    const response = await fetch(userRolesUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }
    setUserRoles(data);
  } catch (error) {
    console.error(error);
  }
};

const currentlySelectedUser = computed(() => {
  if (state.currentlySelectedUserIndex < 0) {
    return [];
  }

  return state.users[state.currentlySelectedUserIndex];
});

const handleUserAdded = () => {
  getUsers();
};

const handleUserUpdated = () => {
  getUsers();
};

const handleUserDeleted = () => {
  state.users.splice(state.currentlySelectedUserIndex, 1);
  state.currentlySelectedUserIndex = 0;
};

</script>

<template>
  <admin-layout>
    <header class="app-header">
      <h1 class="app-header__heading">Users</h1>
      <div class="app-header__actions">
        <router-link
          to='/admin/rental-lists'
          class="app-header__link">
          View Rental Lists
        </router-link>
        <router-link
          to='/admin/wish-lists'
          class="app-header__link">View Wish Lists
        </router-link>
        <button class='app-header__button' @click='toggleAddUserModal'>Add New User</button>
      </div>
    </header>
    <div id='browse'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
        <tr>
          <th>id</th>
          <th>user role id</th>
          <th>first name</th>
          <th>last name</th>
          <th>email</th>
          <th>address line 1</th>
          <th>address line 2</th>
          <th>city</th>
          <th>state</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for='(user, index) in state.users' :key='`user-${user.id}`'>
          <td>{{ user.id }}</td>
          <td>{{ user.user_role_id }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address_line_1 }}</td>
          <td>{{ user.address_line_2 }}</td>
          <td>{{ user.city }}</td>
          <td>{{ user.state }}</td>
          <td colspan='4' >
            <div class='app-table__actions'>
              <button @click='toggleUserWishListModal(index)'>View Wish List</button>
              <button @click='toggleUserRentalListModal(index)'>View Rental List</button>
              <button @click='toggleUpdateUserModal(index)'>Edit User</button>
              <button class='red-button' @click='toggleDeleteUserModal(index)'>Delete User</button>
            </div>
          </td>
        </tr>
      </table>
    </div><!-- browse -->

    <add-user-form
      :is-add-user-modal-active='state.isAddUserModalActive'
      :user-roles='state.userRoles'
      @toggle-add-user-modal='toggleAddUserModal'
      @user-added='handleUserAdded' />
    <update-user-form
      :user='currentlySelectedUser'
      :user-roles='state.userRoles'
      :is-update-user-modal-active='state.isUpdateUserModalActive'
      @toggle-update-user-modal='toggleUpdateUserModal'
      @user-updated='handleUserUpdated' />
    <delete-user-form
      :user='currentlySelectedUser'
      :is-delete-user-modal-active='state.isDeleteUserModalActive'
      @toggle-delete-user-modal='toggleDeleteUserModal'
      @user-deleted='handleUserDeleted' />
    <user-wish-list
      :user='currentlySelectedUser'
      :is-user-wish-list-modal-active='state.isUserWishListModalActive'
      @toggle-user-wish-list-modal='toggleUserWishListModal' />
    <user-rental-list
      :user='currentlySelectedUser'
      :is-user-rental-list-modal-active='state.isUserRentalListModalActive'
      @toggle-user-rental-list-modal='toggleUserRentalListModal' />
  </admin-layout>
</template>
