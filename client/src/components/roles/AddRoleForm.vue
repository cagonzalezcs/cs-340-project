<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isAddRoleModalActive': Boolean,
});
const emit = defineEmits(['toggleAddRoleModal', 'userRoleAdded']);

const baseUrl = import.meta.env.VITE_SERVER_URI;
const userRoleUrl = `${ baseUrl }user-roles`;

const state = reactive({
  newUserRole: {
    type: ''
  }
});

const toggleAddRoleModal = () => {
  emit('toggleAddRoleModal');
};

const addUserRole = async () => {
  try {
    if (!state.newUserRole.type) {
      return alert('User role type must be populated to enter');
    }

    const response = await fetch(userRoleUrl, {
      method: 'POST',
      body: JSON.stringify(state.newUserRole),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status !== 200) {
      alert('There was an error adding this user role. Please try again later.');
      return;
    }

    alert('Success!');
    emit('userRoleAdded');
    state.newUserRole = {
      type: ''
    };
    toggleAddRoleModal();

  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddRoleModalActive' @toggle-active-status='toggleAddRoleModal'>
    <div id='insert'>
      <form id='addRole' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add User Role</strong></legend>
        <fieldset class='fields'>
          <label for='role-type'> type </label>
          <input id='role-type' v-model='state.newUserRole.type' type='text' name='type'>
        </fieldset>
        <input id='addRole' class='btn' type='submit' value='Add New Role' @click='addUserRole'>
        <input class='btn' type='button' value='Cancel' @click='toggleAddRoleModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
