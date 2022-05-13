<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isEditAuthorModalActive': Boolean,
});
const emit = defineEmits(['toggleEditAuthorModal']);

const toggleEditAuthorModal = () => {
  emit('toggleEditAuthorModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isEditAuthorModalActive' @toggle-active-status='toggleEditAuthorModal'>
    <div id='update'>
      <form id='updateAuthor' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Edit Author</strong></legend>
        <fieldset class='fields'>
          <input id='updateAuthorID' type='hidden' name='author_ID' value='1'>
          <label for='author-name'> name </label>
          <input id='author-name' type='text' name='name' value='Adiana Pavlishchev'>
          <label for='author-birth-date'> birth_date </label>
          <input id='author-birth-date' type='date' name='birth_date' value='2020-07-11'>
        </fieldset>
        <input id='editAuthor' class='btn' type='submit' value='Edit Author'>
        <input class='btn' type='button' value='Cancel' @click='toggleEditAuthorModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
