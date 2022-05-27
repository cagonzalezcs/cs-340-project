<script setup>
import AppModal from '../../components/AppModal.vue';
import { reactive, watch } from 'vue';
const props = defineProps({
  'isUpdateUserModalActive': Boolean,
  user: { type: Object, default: () => {}, required: false },
});
const emit = defineEmits(['toggleUpdateUserModal', 'userUpdated']);

const state = reactive({
  updatedUser: {
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

watch(() => props.isUpdateUserModalActive, async () => {
  if (!props.isUpdateUserModalActive) {
    return;
  }

  state.updatedUser = {
    user_role: props.user.user_role_id,
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    email: props.user.email,
    address_line_1: props.user.address_line_1,
    address_line_2: props.user.address_line_2,
    city: props.user.city,
    state: props.user.state,
    password: '',
  };
});

const toggleUpdateUserModal = () => {
  emit('toggleUpdateUserModal');
};

const updateUser = async () => {
  try {
    const userUpdates = state.updatedUser;
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }/users/${ props.user.id }`, {
      method: 'PUT',
      body: JSON.stringify(userUpdates),
      headers: {
        'Content-type': 'application/json',
      }
    });

    if (response.status !== 200) {
      alert('ERROR: Something went wrong with updating this user.');
      return;
    }

    alert('Success!');
    emit('userUpdated', {...state.updatedUser, id: props.user.id});
    toggleUpdateUserModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isUpdateUserModalActive' @toggle-active-status='toggleUpdateUserModal'>
    <div id='update'>
      <form id='updateUser' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Update User</strong></legend>
        <fieldset class='fields'>
          <input id='updateUserID' type='hidden' name='userID' value='1'>
          <label for='user-role-id'> user role </label>
          <select id='user-role-id' v-model='state.updatedUser.user_role_id'>
            <option value='0'>&nbsp;</option>
            <option value='1'>admin</option>
            <option value='2'>manager</option>
            <option value='3'>sales</option>
            <option value='4'>customer</option>
          </select>
          <label for='first-name'> first_name </label>
          <input id='first-name' v-model='state.updatedUser.first_name' type='text' name='first-name'>
          <label for='last-name'> last_name </label>
          <input id='last-name' v-model='state.updatedUser.last_name' type='text' name='last-name'>
          <label for='email'> email </label>
          <input id='email' v-model='state.updatedUser.email' type='text' name='email'>
          <br>
          <label for='address-line-1'> address_line_1 </label>
          <input id='address-line-2' v-model='state.updatedUser.address_line_1' type='text' name='address-line-1'>
          <label for='address-line-2'> address_line_2 </label>
          <input id='address-line-2' v-model='state.updatedUser.address_line_2' type='text' name='address-line-2'>
          <label for='city'> city </label>
          <input id='city' v-model='state.updatedUser.city' type='text' name='city'>
          <label for='state'> state </label>
          <input id='state' v-model='state.updatedUser.state' type='text' name='state'>
          <label for='password'> password </label>
          <input id='password' v-model='state.updatedUser.password' type='password' name='password'>
        </fieldset>
        <input id='addUser' class='btn' type='submit' value='Update User' @click='updateUser'>
        <input id='user' class='btn' type='button' value='Cancel' @click='toggleUpdateUserModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
