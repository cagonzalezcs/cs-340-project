<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isAddGenreModalActive': Boolean,
});
const emit = defineEmits(['toggleAddGenreModal']);

const toggleAddGenreModal = () => {
  emit('toggleAddGenreModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddGenreModalActive' @toggle-active-status='toggleAddGenreModal'>
    <div id='insert'>
      <form id='addGenre' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Genre</strong></legend>
        <fieldset class='fields'>
          <label for='genre-name'> name </label>
          <input id='genre-name' type='text' name='genreName'>
        </fieldset>
        <input id='addGenre' class='btn' type='submit' value='Add New Genre'>
        <input class='btn' type='button' value='Cancel' @click='toggleAddGenreModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
