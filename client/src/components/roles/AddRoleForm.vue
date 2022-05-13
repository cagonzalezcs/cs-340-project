<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isAddRoleModalActive': Boolean,
});
const emit = defineEmits(['toggleAddRoleModal']);

const toggleAddRoleModal = () => {
  emit('toggleAddRoleModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddRoleModalActive' @toggle-active-status='toggleAddRoleModal'>
    <div id='insert'>
      <form id='addRole' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add User Role</strong></legend>
        <fieldset class='fields'>
          <label for='role-type'> type </label>
          <input id='role-type' type='text' name='type'>
        </fieldset>
        <input id='addRole' class='btn' type='submit' value='Add New Role'>
        <input class='btn' type='button' value='Cancel' @click='toggleAddRoleModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
