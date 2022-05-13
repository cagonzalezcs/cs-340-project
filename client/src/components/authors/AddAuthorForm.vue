<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isAddAuthorModalActive': Boolean,
});
const emit = defineEmits(['toggleAddAuthorModal']);

const toggleAddAuthorModal = () => {
  emit('toggleAddAuthorModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddAuthorModalActive' @toggle-active-status='toggleAddAuthorModal'>
    <div id='insert'>
      <form id='addAuthor' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Author</strong></legend>
        <fieldset class='fields'>
          <label for='author-name'> name </label>
          <input id='author-name' type='text' name='name'>
          <label for='author-birth-date'> birth_date </label>
          <input id='author-birth-date' type='date' name='birth_date'>
        </fieldset>
        <input id='addAuthor' class='btn' type='submit' value='Add New Author'>
        <input class='btn' type='button' value='Cancel' @click='toggleAddAuthorModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>
