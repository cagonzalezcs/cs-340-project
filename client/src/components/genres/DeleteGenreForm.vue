<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isDeleteGenreModalActive': Boolean,
});
const emit = defineEmits(['toggleDeleteGenreModal']);

const toggleDeleteGenreModal = () => {
  emit('toggleDeleteGenreModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteGenreModalActive' @toggle-active-status='toggleDeleteGenreModal'>
    <div id='delete' style='display: block'>
      <form id='deleteGenre' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Genre</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <p>It will set the Genre on all associated books to NULL</p>
          <input id='deleteGenre' type='hidden' name='genre_ID' value='1'>
          <label><strong>id:</strong></label> 1
          <label> <strong>name:</strong> </label> Non-Fiction
        </fieldset>
        <input id='deleteGenre' class='btn' type='submit' value='Delete Genre'>
        <input class='btn' type='button' value='Cancel' @click='toggleDeleteGenreModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
