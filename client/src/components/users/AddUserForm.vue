<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isAddUserModalActive': Boolean,
});
const emit = defineEmits(['toggleAddUserModal']);

const toggleAddUserModal = () => {
  emit('toggleAddUserModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddUserModalActive' @toggle-active-status='toggleAddUserModal'>
    <div id='insert'>
      <form id='addUser' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add User</strong></legend>
        <fieldset class='fields'>
          <label for='user-role-id'> user role </label>
          <select id='user-role-id'>
            <option value='0'>&nbsp;</option>
            <option value='1'>admin</option>
            <option value='2'>manager</option>
            <option value='3'>sales</option>
            <option value='4'>customer</option>
          </select>
          <label for='first-name'> first_name </label>
          <input id='first-name' type='text' name='first-name'>
          <label for='last-name'> last_name </label>
          <input id='last-name' type='text' name='last-name'>
          <label for='email'> email </label>
          <input id='email' type='text' name='email'>
          <br>
          <label for='address-line-1'> address_line_1 </label>
          <input id='address-line-2' type='text' name='address-line-1'>
          <label for='address-line-2'> address_line_2 </label>
          <input id='address-line-2' type='text' name='address-line-2'>
          <label for='city'> city </label>
          <input id='city' type='text' name='city'>
          <label for='state'> state </label>
          <input id='state' type='text' name='state'>
        </fieldset>
        <input id='addUser' class='btn' type='submit' value='Add New User'>
        <input id='user' class='btn' type='button' value='Cancel' @click='toggleAddUserModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
