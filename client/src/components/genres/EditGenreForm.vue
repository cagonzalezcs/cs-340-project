<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isEditGenreModalActive': Boolean,
});
const emit = defineEmits(['toggleEditGenreModal']);

const toggleEditGenreModal = () => {
  emit('toggleEditGenreModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isEditGenreModalActive' @toggle-active-status='toggleEditGenreModal'>
    <div id='update'>
      <form id='updateGenre' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Edit Genre</strong></legend>
        <fieldset class='fields'>
          <input id='updateGenre' type='hidden' name='genre_ID' value='1'>
          <label for='genre-name'> name </label>
          <input id='genre-name' type='text' name='genreName' value='Non-Fiction'>
        </fieldset>
        <input id='editGenre' class='btn' type='submit' value='Edit Genre'>
        <input class='btn' type='button' value='Cancel' @click='toggleEditGenreModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
