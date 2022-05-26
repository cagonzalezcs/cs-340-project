<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';

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

const updateGenre = async () => {
  try {
    const genreUpdates = state.updatedGenre;
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }genres/${ props.genre.id }`, {
      method: 'PUT', 
      body: JSON.stringify(genreUpdates), 
      headers: {
        'Content-type': 'application/json',
      }
    });
    if (response.status !== 200) {
      alert('ERROR: Something went wrong updating this genre.')
      return;
    }
    alert('Success!');
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
        <input id='editGenre' class='btn' type='submit' value='Update Genre' @click='updateGenre'>
        <input class='btn' type='button' value='Cancel' @click='toggleEditGenreModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
