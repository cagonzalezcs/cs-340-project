<script setup>
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const props = defineProps({
  'isDeleteAuthorModalActive': Boolean,
  author: { type: Object, default: null, required: false }, 
});

const emit = defineEmits(['toggleDeleteAuthorModal', 'authorDeleted']);
const toast = useToast();

const toggleDeleteAuthorModal = () => {
  emit('toggleDeleteAuthorModal');
};

const deleteAuthor = async () => {
  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }authors/${ props.author.id }`, 
    {
      method: 'DELETE', 
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    if (response.status !== 200) {
      toast.error('There was an error deleting the author. Please try again.');
      return;
    }
    toast.success('Author successfully deleted');
    emit('authorDeleted');
    toggleDeleteAuthorModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteAuthorModalActive' @toggle-active-status='toggleDeleteAuthorModal'>
    <div v-if='author' id='delete'>
      <form id='deleteAuthor' method='DELETE' class='app-form' @submit.prevent>
        <legend><strong>Delete Author</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deleteAuthorID' type='hidden' name='authorId' :value='author.id'>
          <label><strong>id:</strong></label> {{ author.id }}
          <label> <strong>name:</strong> </label> {{ author.name }}
        </fieldset>
        <input id='deleteAuthor' class='app-button app-button--accept' type='submit' value='Delete Author' @click='deleteAuthor'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleDeleteAuthorModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
