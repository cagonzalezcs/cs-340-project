<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isDeleteBookModalActive': Boolean,
});
const emit = defineEmits(['toggleDeleteBookModal']);

const toggleDeleteBookModal = () => {
  emit('toggleDeleteBookModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteBookModalActive' @toggle-active-status='toggleDeleteBookModal'>
    <div id='delete'>
      <form id='deleteBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Book</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deletebookID' type='hidden' name='bookID' value='1'>
          <label><strong>id:</strong></label> 1
          <label> <strong>title:</strong> </label> lobortis vel dapibus at diam nam tristique tortor ...
        </fieldset>
        <input id='DeleteBook' class='btn' type='submit' value='Delete Book'>
        <input class='btn' type='button' value='Cancel' @click='toggleDeleteBookModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
