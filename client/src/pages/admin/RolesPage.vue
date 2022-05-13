<script setup>
import { reactive } from 'vue';
import AddRoleForm from '../../components/roles/AddRoleForm.vue';
import EditRoleForm from '../../components/roles/EditRoleForm.vue';
import DeleteRoleForm from '../../components/roles/DeleteRoleForm.vue';

let state = reactive({
  isAddRoleModalActive: false,
  isEditRoleModalActive: false,
  isDeleteRoleModalActive: false
});

const toggleAddRoleModal = () => {
  state.isAddRoleModalActive = !state.isAddRoleModalActive;
};
const toggleEditRoleModal = () => {
  state.isEditRoleModalActive = !state.isEditRoleModalActive;
};
const toggleDeleteRoleModal = () => {
  state.isDeleteRoleModalActive = !state.isDeleteRoleModalActive;
};
</script>

<template>
  <div id='header'>
    <h1>Roles</h1>
    <p>View All User Roles | Add User Roles | Update User Roles | Delete User Roles</p>
  </div>
  <div id='browseRoles'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>type</th>
        <th></th>
        <th><button @click='toggleAddRoleModal'>Add New Role</button></th>
      </tr>
      <tr>
        <td>1</td>
        <td>admin</td>
        <td><button @click='toggleEditRoleModal'>Edit Role</button></td>
        <td><button @click='toggleDeleteRoleModal'>Delete Role</button></td>
      </tr>
      <tr>
        <td>2</td>
        <td>manager</td>
        <td><button @click='toggleEditRoleModal'>Edit Role</button></td>
        <td><button @click='toggleDeleteRoleModal'>Delete Role</button></td>
      </tr>
      <tr>
        <td>3</td>
        <td>sales</td>
        <td><button @click='toggleEditRoleModal'>Edit Role</button></td>
        <td><button @click='toggleDeleteRoleModal'>Delete Role</button></td>
      </tr>
      <tr>
        <td>4</td>
        <td>customer</td>
        <td><button @click='toggleEditRoleModal'>Edit Role</button></td>
        <td><button @click='toggleDeleteRoleModal'>Delete Role</button></td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-role-form :is-add-role-modal-active='state.isAddRoleModalActive' @toggle-add-role-modal='toggleAddRoleModal' />
  <edit-role-form :is-edit-role-modal-active='state.isEditRoleModalActive' @toggle-edit-role-modal='toggleEditRoleModal' />
  <delete-role-form :is-delete-role-modal-active='state.isDeleteRoleModalActive' @toggle-delete-role-modal='toggleDeleteRoleModal' />
</template>
