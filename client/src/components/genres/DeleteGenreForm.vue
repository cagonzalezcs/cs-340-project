<script setup>
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const props = defineProps({
  'isDeleteGenreModalActive': Boolean,
  genre: { type: Object, default: null, required: false }, 
});

const emit = defineEmits(['toggleDeleteGenreModal', 'genreDeleted']);

const toggleDeleteGenreModal = () => {
  emit('toggleDeleteGenreModal');
};

const toast = useToast();

const deleteGenre = async () => {
  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }genres/${ props.genre.id }`,
    {
      method: 'DELETE', 
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    if (response.status !== 200) {
      toast.error('There was an error deleting the genre. Please try again.');
      return;
    }
    toast.success('Genre successfully deleted');
    emit('genreDeleted'); 
    toggleDeleteGenreModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteGenreModalActive' @toggle-active-status='toggleDeleteGenreModal'>
    <div v-if='genre' id='delete'>
      <form id='deleteGenre' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Genre</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <p>It will set the Genre on all associated books to NULL</p>
          <input id='deleteGenreID' type='hidden' name='genreID' :value='genre.id'>
          <label><strong>id:</strong></label> {{ genre.id }}
          <label> <strong>name:</strong> </label> {{ genre.name }}
        </fieldset>
        <input id='deleteGenre' class='app-button app-button--accept' type='submit' value='Delete Genre' @click='deleteGenre'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleDeleteGenreModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
