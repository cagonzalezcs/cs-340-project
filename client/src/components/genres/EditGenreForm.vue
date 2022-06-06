<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const props = defineProps({
  isEditGenreModalActive: Boolean,
  genre: { type: Object, default: () => {}, required: false }
});

const emit = defineEmits(['toggleEditGenreModal', 'genreUpdated']);

const state = reactive({
  updatedGenre: {
    name: ''
  }
});

watch(() => props.isEditGenreModalActive, async () => {
  if (!props.isEditGenreModalActive) {
    return;
  }
  state.updatedGenre = {
    name: props.genre.name,
  };
});

const toggleEditGenreModal = () => {
  emit('toggleEditGenreModal');
};

const toast = useToast();

const updateGenre = async () => {
  try {
    const genreUpdates = state.updatedGenre;
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }genres/${ props.genre.id }`, {
      method: 'PUT', 
      body: JSON.stringify(genreUpdates), 
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      }
    });
    if (response.status !== 200) {
      toast.error('ERROR: Something went wrong updating this genre.');
      return;
    }
    toast.success('Genre successfully updated');
    emit('genreUpdated', {...state.updatedGenre, id: props.genre.id});
    toggleEditGenreModal();
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <app-modal :is-modal-active='props.isEditGenreModalActive' @toggle-active-status='toggleEditGenreModal'>
    <div v-if='genre' id='update'>
      <form id='updateGenre' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Edit Genre</strong></legend>
        <fieldset class='fields'>
          <label for='genre-name'> name </label>
          <input id='genre-name' v-model='state.updatedGenre.name' type='text' name='name' required>
        </fieldset>
        <input id='editGenre' class='app-button app-button--accept' type='submit' value='Update Genre' @click='updateGenre'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleEditGenreModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
