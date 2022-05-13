<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';

const props = defineProps({
  'isAddBookModalActive': Boolean,
});
const emit = defineEmits(['toggleAddBookModal']);
const state = reactive({
  isAddingAuthor: false,
  isAddingGenre: false
});

const toggleIsAddingNewAuthor = () => {
  state.isAddingAuthor = !state.isAddingAuthor;
};
const toggleIsAddingNewGenre = () => {
  state.isAddingGenre = !state.isAddingGenre;
};

const toggleAddBookModal = () => {
  emit('toggleAddBookModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddBookModalActive' @toggle-active-status='toggleAddBookModal'>
    <div id='insert'>
      <form id='addBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Book</strong></legend>
        <fieldset class='fields'>
          <label for='book-title'> title </label>
          <input id='book-title'  type='text' name='title'>
          <div class='input-group author-input-group'>
            <div v-if='!state.isAddingAuthor' class='input-group__content author-input-group__existing' >
              <label for='author_id'> author: </label>
              <select id='author_id'>
                <option value='0'>&nbsp;</option>
                <option value='1'>Adiana Pavlishchev</option>
                <option value='2'>Perren Benzi</option>
                <option value='3'>Berne Yele</option>
                <option value='4'>Robbi Feild</option>
                <option value='5'>Thomasin Seakin</option>
              </select>
            </div>
            <div v-else class='input-group__content author-input-group__new'>
              <label for='author-name'> new author name </label>
              <input id='author-name' type='text' name='name'>
              <label for='author-birth-date'> author birth_date </label>
              <input id='author-birth-date' type='date' name='birth_date'>
            </div>
            <button class='input-group__button' @click='toggleIsAddingNewAuthor'>
              {{ state.isAddingAuthor ? 'Cancel' : 'Add New Author' }}
            </button>
          </div>

          <div class='input-group genre-input-group'>
            <div v-if='!state.isAddingGenre' class='input-group__content genre-input-group__existing'>
              <label for='book-genre'> genre </label>
              <select name='genre_id'>
                <option value='0'>&nbsp;</option>
                <option value='1'>Non-Fiction</option>
                <option value='2'>Fiction</option>
                <option value='3'>Horror</option>
                <option value='4'>Comedy</option>
                <option value='5'>Drama</option>
              </select>
            </div>
            <div  v-else  class='input-group__content genre-input-group__new'>
              <label for='genre-name'> new genre name </label>
              <input id='genre-name' type='text' name='genreName'>
            </div>
            <button class='input-group__button' @click='toggleIsAddingNewGenre'>
              {{ state.isAddingGenre ? 'Cancel' : 'Add New Genre' }}
            </button>
          </div>
          <label for='book-isbn'> isbn </label>
          <input id='book-isbn' type='text' name='isbn'>
          <label for='book-cover-image'> cover_image </label>
          <input id='book-cover-image' type='text' name='cover_image'>
          <label for='book-qty-available'> quantity_available </label>
          <input id='book-qty-available' type='text' name='quantity_available'>
          <label for='book-qty-rented'> quantity_rented </label>
          <input id='book-qty-rented' type='text' name='quantity_rented'>
        </fieldset>
        <input id='addBook' class='btn' type='button' value='Add New Book'>
        <input class='btn' type='button' value='Cancel' @click='toggleAddBookModal'>
      </form>
    </div><!-- insert -->
  </app-modal>
</template>

<style lang='scss'>
.input-group {
  display: flex;
  align-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 20px;
  }

  &__button {
    flex-shrink: 0;
    width: 175px;
  }
}

</style>
