<script setup>
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';
const props = defineProps({
  'isDeleteUserModalActive': Boolean,
  user: { type: Object, default: null, required: false },
});
const emit = defineEmits(['toggleDeleteUserModal', 'userDeleted']);

const toggleDeleteUserModal = () => {
  emit('toggleDeleteUserModal');
};

const toast = useToast();

const deleteUser = async () => {
  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }/users/${ props.user.id }`,
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

    toast.success('User successfully deleted');
    emit('userDeleted');
    toggleDeleteUserModal();
  } catch(error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteUserModalActive' @toggle-active-status='toggleDeleteUserModal'>
    <div id='delete' style='display: block'>
      <form id='deleteUser' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete User</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deletepersonID' type='hidden' name='personID' :value='user.id'>
          <label><strong>id:</strong></label> {{ user.id }}
          <label> <strong>first_name:</strong> </label> {{ user.first_name }}
          <label> <strong>last_name:</strong> </label> {{ user.last_name}}
        </fieldset>
        <input id='DeleteUser' class='app-button app-button--accept' type='submit' value='Delete User' @click='deleteUser'>
        <input id='user' class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleDeleteUserModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
