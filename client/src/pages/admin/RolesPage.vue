<script setup>
import { reactive, onMounted, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware';
import AddRoleForm from '../../components/roles/AddRoleForm.vue';
import EditRoleForm from '../../components/roles/EditRoleForm.vue';
import DeleteRoleForm from '../../components/roles/DeleteRoleForm.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import { useAdminStore } from '../../stores/admin';

const adminStore = useAdminStore();

onMounted(async () => {
  await checkUserIsAdmin();
  await getUserRoles();
});

let state = reactive({
  isAddRoleModalActive: false,
  isEditRoleModalActive: false,
  isDeleteRoleModalActive: false,
  currentlySelectedUserRoleIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleAddRoleModal = () => {
  state.isAddRoleModalActive = !state.isAddRoleModalActive;
};
const toggleEditRoleModal = (userRoleIndex) => {
  if (!isNaN(userRoleIndex)) {
    state.currentlySelectedUserRoleIndex = userRoleIndex;
  }

  state.isEditRoleModalActive = !state.isEditRoleModalActive;
};
const toggleDeleteRoleModal = (userRoleIndex) => {
  if (!isNaN(userRoleIndex)) {
    state.currentlySelectedUserRoleIndex = userRoleIndex;
  }

  state.isDeleteRoleModalActive = !state.isDeleteRoleModalActive;
};

const setUserRoles = (userRoles) => {
  adminStore.userRoles = userRoles?.length ? userRoles : [];
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

const currentlySelectedUserRole = computed(() => {
  if (state.currentlySelectedUserRoleIndex < 0) {
    return [];
  }

  return adminStore.userRoles[state.currentlySelectedUserRoleIndex];
});

const handleUserRoleAdded = () => {
  getUserRoles();
};

const handleUserRoleUpdated = () => {
  getUserRoles();
};

const handleUserRoleDeleted = () => {
  adminStore.userRoles.splice(state.currentlySelectedUserRoleIndex, 1);
  state.currentlySelectedUserRoleIndex = 0;
};
</script>

<template>
  <admin-layout>
    <header class='app-header'>
      <h1 class='app-header__heading'>Roles</h1>
      <div class='app-header__actions'>
        <button class='app-header__button' @click='toggleAddRoleModal'>Add New Role</button>
      </div>
    </header>
    <div id='browseRoles'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
        <tr>
          <th>id</th>
          <th>type</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for='(userRole, index) in adminStore.userRoles' :key='`user-role-${userRole.id}`'>
          <td>{{ userRole.id }}</td>
          <td>{{ userRole.type }}</td>
          <td colspan='2'>
            <div class='app-table__actions'>
              <button @click='toggleEditRoleModal(index)'>Edit Role</button>
              <button class='red-button' @click='toggleDeleteRoleModal(index)'>Delete Role</button>
            </div>
          </td>
        </tr>
      </table>
    </div><!-- browse -->

    <add-role-form
      :is-add-role-modal-active='state.isAddRoleModalActive'
      @toggle-add-role-modal='toggleAddRoleModal'
      @user-role-added='handleUserRoleAdded'
    />
    <edit-role-form
      :is-edit-role-modal-active='state.isEditRoleModalActive'
      :user-role='currentlySelectedUserRole'
      @toggle-edit-role-modal='toggleEditRoleModal'
      @user-role-updated='handleUserRoleUpdated'
    />
    <delete-role-form
      :is-delete-role-modal-active='state.isDeleteRoleModalActive'
      :user-role='currentlySelectedUserRole'
      @toggle-delete-role-modal='toggleDeleteRoleModal'
      @user-role-deleted='handleUserRoleDeleted'
    />
  </admin-layout>
</template>
