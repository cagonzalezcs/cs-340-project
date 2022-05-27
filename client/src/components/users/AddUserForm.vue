<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';

const baseUrl = import.meta.env.VITE_SERVER_URI;
const userUrl = `${ baseUrl }users`;

const props = defineProps({
  'isAddUserModalActive': Boolean,
});
const emit = defineEmits(['toggleAddUserModal', 'userAdded']);

const state = reactive({
  newUser: {
    user_role_id: 0,
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

const addUser = async () => {
  try {
    const response = await fetch(userUrl, {
      method: 'POST',
      body: JSON.stringify(state.newUser),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status !== 200) {
      alert('There was an error adding this book. Please try again later.');
      return;
    }

    alert('Success!');
    emit('userAdded');
    state.newUser = {
      user_role_id: 0,
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
      <form id='addUser' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add User</strong></legend>
        <fieldset class='fields'>
          <label for='user-role-id'> user role </label>
          <select id='user-role-id' v-model='state.newUser.user_role_id'>
            <option value='0'>&nbsp;</option>
            <option value='1'>admin</option>
            <option value='2'>manager</option>
            <option value='3'>sales</option>
            <option value='4'>customer</option>
          </select>
          <label for='first-name'> first_name </label>
          <input id='first-name' v-model='state.newUser.first_name' type='text' name='first-name'>
          <label for='last-name'> last_name </label>
          <input id='last-name' v-model='state.newUser.last_name' type='text' name='last-name'>
          <label for='email'> email </label>
          <input id='email' v-model='state.newUser.email' type='text' name='email'>
          <br>
          <label for='address-line-1'> address_line_1 </label>
          <input id='address-line-2' v-model='state.newUser.address_line_1' type='text' name='address-line-1'>
          <label for='address-line-2'> address_line_2 </label>
          <input id='address-line-2' v-model='state.newUser.address_line_2' type='text' name='address-line-2'>
          <label for='city'> city </label>
          <input id='city' v-model='state.newUser.city' type='text' name='city'>
          <label for='state'> state </label>
          <input id='state' v-model='state.newUser.state' type='text' name='state'>
          <label for='password'> password </label>
          <input id='password' v-model='state.newUser.password' type='password' name='password'>
        </fieldset>
        <input id='addUser' class='btn' type='submit' value='Add New User' @click='addUser'>
        <input id='user' class='btn' type='button' value='Cancel' @click='toggleAddUserModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
