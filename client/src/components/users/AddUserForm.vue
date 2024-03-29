<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;
const userUrl = `${ baseUrl }users`;

const props = defineProps({
  'isAddUserModalActive': Boolean,
  userRoles: { type: Array, required: false, default: () => [] },
});
const emit = defineEmits(['toggleAddUserModal', 'userAdded']);

const state = reactive({
  newUser: {
    user_role_id: 1,
    first_name: '',
    last_name: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    password: '',
  },
});

const toggleAddUserModal = () => {
  emit('toggleAddUserModal');
};

const toast = useToast();

const addUser = async () => {
  try {
    const response = await fetch(userUrl, {
      method: 'POST',
      body: JSON.stringify(state.newUser),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });

    if (response.status !== 200) {
      toast.error('There was an error adding this user. Please try again later.');
      return;
    }

    toast.success('User successfully added');
    emit('userAdded');
    state.newUser = {
      user_role_id: 1,
      first_name: '',
      last_name: '',
      email: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      password: '',
    };
    toggleAddUserModal();

  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddUserModalActive' @toggle-active-status='toggleAddUserModal'>
    <div id='insert'>
      <form id='addUserForm' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add User</strong></legend>
        <fieldset class='fields'>
          <label for='user-role-id'> user role </label>
          <select id='user-role-id' v-model='state.newUser.user_role_id' required>
            <option v-for='userRole in userRoles' :key='`user-role-${userRole.id}`' :value='userRole.id'>{{ userRole.type }}</option>
          </select>
          <label for='first-name'> first name </label>
          <input id='first-name' v-model='state.newUser.first_name' type='text' name='first-name'>
          <label for='last-name'> last name </label>
          <input id='last-name' v-model='state.newUser.last_name' type='text' name='last-name'>
          <label for='email'> email </label>
          <input id='email' v-model='state.newUser.email' type='text' name='email'>
          <br>
          <label for='address-line-1'> address line 1 </label>
          <input id='address-line-1' v-model='state.newUser.address_line_1' type='text' name='address-line-1'>
          <label for='address-line-2'> address line 2 </label>
          <input id='address-line-2' v-model='state.newUser.address_line_2' type='text' name='address-line-2'>
          <label for='city'> city </label>
          <input id='city' v-model='state.newUser.city' type='text' name='city'>
          <label for='state'> state </label>
          <input id='state' v-model='state.newUser.state' type='text' name='state'>
          <label for='password'> password </label>
          <input id='password' v-model='state.newUser.password' type='password' name='password'>
        </fieldset>
        <input id='addUser' class='app-button app-button--accept' type='submit' value='Add New User' @click='addUser'>
        <input id='user' class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleAddUserModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
