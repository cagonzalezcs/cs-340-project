<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;
const authorUrl = `${ baseUrl }authors`; 

const props = defineProps({
  'isAddAuthorModalActive': Boolean,
});

const emit = defineEmits(['toggleAddAuthorModal', 'authorAdded']);

const state = reactive({
  newAuthor: {
    name: '', 
    birth_date: '',
  },
});

const toast = useToast();

const toggleAddAuthorModal = () => {
  emit('toggleAddAuthorModal');
};

const addAuthor = async () => {
  try {
    const response = await fetch(authorUrl, {
      method: 'POST', 
      body: JSON.stringify(state.newAuthor), 
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    if (response.status !== 200) {
      toast.error('There was an error adding this Author. Please try again later.');
      return;
    }
    toast.success('Author successfully added');
    emit('authorAdded');
    state.newAuthor = {
      name: '', 
      birth_date: ''
    };
    toggleAddAuthorModal();
  } catch(error) {
    console.error(error);
  }
};

</script>

<template>
  <app-modal :is-modal-active='props.isAddAuthorModalActive' @toggle-active-status='toggleAddAuthorModal'>
    <div id='insert'>
      <form id='addAuthor' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Author</strong></legend>
        <fieldset class='fields'>
          <label for='author-name'> name </label>
          <input id='author-name' v-model='state.newAuthor.name' type='text' name='name'>
          <label for='author-birth-date'> birth date </label>
          <input id='author-birth-date' v-model='state.newAuthor.birth_date' type='date' name='birth_date'>
        </fieldset>
        <input id='addAuthor' class='app-button app-button--accept' type='submit' value='Add New Author' @click='addAuthor'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleAddAuthorModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
