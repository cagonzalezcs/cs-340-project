<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isDeleteUserModalActive': Boolean,
});
const emit = defineEmits(['toggleDeleteUserModal']);

const toggleDeleteUserModal = () => {
  emit('toggleDeleteUserModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteUserModalActive' @toggle-active-status='toggleDeleteUserModal'>
    <div id='delete' style='display: block'>
      <form id='deleteUser' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete User</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deletepersonID' type='hidden' name='personID' value='1'>
          <label><strong>id:</strong></label> 1
          <label> <strong>first_name:</strong> </label> Baryram
          <label> <strong>last_name:</strong> </label> Basil
        </fieldset>
        <input id='DeleteUser' class='btn' type='submit' value='Delete User'>
        <input id='user' class='btn' type='button' value='Cancel' @click='toggleDeleteUserModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
