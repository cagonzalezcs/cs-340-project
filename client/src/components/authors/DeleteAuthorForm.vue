<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isDeleteAuthorModalActive': Boolean,
});
const emit = defineEmits(['toggleDeleteAuthorModal']);

const toggleDeleteAuthorModal = () => {
  emit('toggleDeleteAuthorModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteAuthorModalActive' @toggle-active-status='toggleDeleteAuthorModal'>
    <div id='delete' style='display: block'>
      <form id='deleteAuthor' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Author</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deleteAuthorID' type='hidden' name='author_ID' value='1'>
          <label><strong>id:</strong></label> 1
          <label> <strong>name:</strong> </label> Adiana Pavlishchev
        </fieldset>
        <input id='deleteAuthor' class='btn' type='submit' value='Delete Author'>
        <input class='btn' type='button' value='Cancel' @click='toggleDeleteAuthorModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
