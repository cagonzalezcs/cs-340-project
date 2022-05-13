<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isEditRoleModalActive': Boolean,
});
const emit = defineEmits(['toggleEditRoleModal']);

const toggleEditRoleModal = () => {
  emit('toggleEditRoleModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isEditRoleModalActive' @toggle-active-status='toggleEditRoleModal'>
    <div id='update'>
      <form id='updateRole' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Edit Role</strong></legend>
        <fieldset class='fields'>
          <label for='role-type'> type </label>
          <input id='role-type' type='text' name='type' value='admin'>
        </fieldset>
        <input id='editRole' class='btn' type='submit' value='Edit Role'>
        <input class='btn' type='button' value='Cancel' @click='toggleEditRoleModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
