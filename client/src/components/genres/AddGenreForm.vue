<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;
const genreUrl = `${ baseUrl }genres`;

const props = defineProps({
  'isAddGenreModalActive': Boolean,
});
const emit = defineEmits(['toggleAddGenreModal', 'genreAdded']);
const state = reactive({
  newGenre: {
    name: '',
  },
});

const toggleAddGenreModal = () => {
  emit('toggleAddGenreModal');
};

const toast = useToast();

const addGenre = async () => {
  try {
    const response = await fetch(genreUrl, {
      method: 'POST',
      body: JSON.stringify(state.newGenre),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    if (response.status !== 200) {
      toast.error('There was an error adding this Genre. Please try again later.');
      return;
    }
    toast.success('Genre successfully added');
    emit('genreAdded');
    state.newGenre = {
      name: '',
    };
    toggleAddGenreModal();
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <app-modal :is-modal-active='props.isAddGenreModalActive' @toggle-active-status='toggleAddGenreModal'>
    <div id='insert'>
      <form id='addGenre' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Genre</strong></legend>
        <fieldset class='fields'>
          <label for='genre-name'> name </label>
          <input id='genre-name' v-model='state.newGenre.name' type='text' name='name' required />
        </fieldset>
        <input
id='addGenre' class='app-button app-button--accept' type='submit' value='Add New Genre'
               @click='addGenre'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleAddGenreModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
