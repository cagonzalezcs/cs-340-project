<script setup>
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const props = defineProps({
  'isDeleteRoleModalActive': Boolean,
  userRole: { type: Object, default: null, required: false },
});
const emit = defineEmits(['toggleDeleteRoleModal', 'userRoleDeleted']);

const toggleDeleteRoleModal = () => {
  emit('toggleDeleteRoleModal');
};

const toast = useToast();

const deleteUserRole = async () => {
  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }/user-roles/${ props.userRole.id }`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status !== 200) {
      toast.error('There was an error in deleting your user. Please try again later');
      return;
    }

    toast.success('Role successfully deleted');
    emit('userRoleDeleted');
    toggleDeleteRoleModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteRoleModalActive' @toggle-active-status='toggleDeleteRoleModal'>
    <div id='delete' style='display: block'>
      <form id='deleteRole' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete User Role</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deleteUserRoleID' type='hidden' name='user_role_ID' :value='props.userRole.id'>
          <label><strong>ID:</strong></label> {{ props.userRole.id }}
          <label> <strong>Type</strong> </label> {{ props.userRole.type }}
        </fieldset>
        <input id='deleteRole' class='app-button app-button--accept' type='submit' value='Delete Role' @click='deleteUserRole'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleDeleteRoleModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
