<script setup>
import AppModal from '../../components/AppModal.vue';
import { reactive, watch } from 'vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const props = defineProps({
  'isEditRoleModalActive': Boolean,
  userRole: {
    type: Object, default: () => {
    }, required: false,
  },
});
const emit = defineEmits(['toggleEditRoleModal', 'userRoleUpdated']);

const toggleEditRoleModal = () => {
  emit('toggleEditRoleModal');
};
const state = reactive({
  updatedUserRole: {
    type: '',
  },
});

watch(() => props.isEditRoleModalActive, async () => {
  if (!props.isEditRoleModalActive) {
    return;
  }

  state.updatedUserRole = {
    type: props.userRole.type,
  };
});

const toast = useToast();

const updateUserRole = async () => {
  try {
    const userRoleUpdates = state.updatedUserRole;
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }/user-roles/${ props.userRole.id }`, {
      method: 'PUT',
      body: JSON.stringify(userRoleUpdates),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });

    if (response.status !== 200) {
      toast.error('ERROR: Something went wrong with updating this user.');
      return;
    }

    toast.success('Role successfully updated');
    emit('userRoleUpdated', { ...state.updatedUserRole, id: props.userRole.id });
    toggleEditRoleModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isEditRoleModalActive' @toggle-active-status='toggleEditRoleModal'>
    <div id='update'>
      <form id='updateRole' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Edit Role</strong></legend>
        <fieldset class='fields'>
          <label for='role-type'> type </label>
          <input id='role-type' v-model='state.updatedUserRole.type' type='text' name='type'>
        </fieldset>
        <input id='editRole' class='app-button app-button--accept' type='submit' value='Edit Role' @click='updateUserRole'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleEditRoleModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
