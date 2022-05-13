<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isUpdateUserModalActive': Boolean,
});
const emit = defineEmits(['toggleUpdateUserModal']);

const toggleUpdateUserModal = () => {
  emit('toggleUpdateUserModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isUpdateUserModalActive' @toggle-active-status='toggleUpdateUserModal'>
    <div id='update'>
      <form id='updateUser' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Update User</strong></legend>
        <fieldset class='fields'>
          <input id='updateUserID' type='hidden' name='userID' value='1'>
          <label for='user-id'> id: </label> 1
          <label for='user-role-id'> user role </label>
          <select id='user-role-id'>
            <option value='0'>&nbsp;</option>
            <option value='1' selected>admin</option>
            <option value='2'>manager</option>
            <option value='3'>sales</option>
            <option value='4'>customer</option>
          </select>
          <label for='first-name'> first_name </label>
          <input id='first-name' type='text' name='first-name' value='Baryram'>
          <label for='last-name'> last_name </label>
          <input id='last-name' type='text' name='last-name' value='Basil'>
          <label for='email'> email </label>
          <input id='email' type='text' name='email' value='bbasil0@thetimes.co.uk'>
          <br>
          <label for='address-line-1'> address_line_1 </label>
          <input id='address-line-1' type='text' name='address-line-1' value='6 Farwell Trail'>
          <label for='address-line-2'> address_line_2 </label>
          <input id='address-line-2' type='text' name='address-line-2' value='NULL'>
          <label for='city'> city </label>
          <input id='citye' type='text' name='city' value='New York City'>
          <label for='state'> state </label>
          <input id='state' type='text' name='state' value='New York'>
        </fieldset>
        <input id='addUser' class='btn' type='submit' value='Update User'>
        <input id='user' class='btn' type='button' value='Cancel' @click='toggleUpdateUserModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
