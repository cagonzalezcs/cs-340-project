<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isDeleteRoleModalActive': Boolean,
});
const emit = defineEmits(['toggleDeleteRoleModal']);

const toggleDeleteRoleModal = () => {
  emit('toggleDeleteRoleModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteRoleModalActive' @toggle-active-status='toggleDeleteRoleModal'>
    <div id='delete' style='display: block'>
      <form id='deleteRole' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete User Role</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deleteUserRoleID' type='hidden' name='user_role_ID' value='1'>
          <label><strong>ID:</strong></label> 1
          <label> <strong>Type</strong> </label> admin
        </fieldset>
        <input id='deleteRole' class='btn' type='submit' value='Delete Role'>
        <input class='btn' type='button' value='Cancel' @click='toggleDeleteRoleModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
