<script setup>
import { reactive } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';

const baseUrl = import.meta.env.VITE_SERVER_URI;
const bookUrl = `${ baseUrl }books`;

const props = defineProps({
  isAddBookModalActive: Boolean,
  authors: { type: Array, required: false, default: () => [] },
  genres: { type: Array, required: false, default: () => [] },
});
const emit = defineEmits(['toggleAddBookModal', 'bookAdded']);
const state = reactive({
  isAddingAuthor: false,
  isAddingGenre: false,
  newBook: {
    title: '',
    authors: [''],
    genre_id: '',
    isbn: '',
    cover_image: '',
    quantity_available: '',
    quantity_rented: '',
  },
  newAuthor: {
    name: '', 
    birth_date: ''
  },
  newGenre: {
    name: '',
  }
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

const addNewAuthor = async (name, birthDate) => {
  if (name !== '' && birthDate !== '') {
    try {
      await fetch(`${baseUrl}authors`, {
         method: 'POST', 
         body: JSON.stringify({ name, birth_date: birthDate }), 
         headers: {
           'Content-type': 'application/json',
           Authorization: `Bearer ${ getAuthToken() }`,
         },
       })
    } catch(e) {
      return new Error({ message: 'Error adding new author' })
    }
  }
}

const addNewGenre = async (name) => {
  if (name !== '') {
    try {
      await fetch(`${baseUrl}genres`, {
        method: 'POST', 
        body: JSON.stringify({ name }), 
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });
    } catch(e) {
      return new Error({ message: 'Error adding new genre' })
    }
  }
}

const addBook = async () => {
  try {
      await addNewAuthor(state.newAuthor?.name, state.newAuthor?.birth_date)
        .then(async () => await addNewGenre(state.newGenre?.name))
        .then(async () => {
            const response = await fetch(bookUrl, {
              method: 'POST',
              body: JSON.stringify(
                {
                  title: state.newBook.title,
                  authors: state.newAuthor.name || state.newBook.authors,
                  genre_id: state.newGenre.name || state.newBook.genre_id,
                  isbn: state.newBook.isbn,
                  cover_image: state.newBook.cover_image,
                  quantity_available: state.newBook.quantity_available,
                  quantity_rented: state.newBook.quantity_rented,
                }
                ),
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ getAuthToken() }`,
              },
            });
            if (response.status !== 200) {
              alert('There was an error adding this Book. Please try again later.');
              return;
            }
        
            alert('Success!');
            emit('bookAdded');
            state.newBook = {
              title: '',
              authors: [''],
              genre_id: '',
              isbn: '',
              cover_image: '',
              quantity_available: '',
              quantity_rented: '',
            };
            toggleAddBookModal();
      })

  } catch (error) {
    return new Error({ message: 'Error adding new book' })
  }
};

</script>

<template>
  <app-modal :is-modal-active='props.isAddBookModalActive' @toggle-active-status='toggleAddBookModal'>
    <div id='insert'>
      <form id='addBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Book </strong></legend>
        <fieldset class='fields'>
          <label for='book-title'> title </label>
          <input id='book-title' v-model='state.newBook.title' type='text' name='title' required />
          <div class='input-group author-input-group'>
            <div v-if='!state.isAddingAuthor' class='input-group__content author-input-group__existing'>
              <label for='author'> author: </label>
              <select id='author' v-model='state.newBook.authors' required multiple>
                <option v-for='author in props.authors' :key='`author-${author.id}`'>{{ author.name }}</option>
              </select>
            </div>
            <div v-else class='input-group__content author-input-group__new'>
              <label for='author-name'> new author name </label>
              <input id='author-name' v-model='state.newAuthor.name' type='text' name='name'>
              <label for='author-birth-date'> author birth_date </label>
              <input id='author-birth-date' v-model='state.newAuthor.birth_date' type='date' name='birth_date'>
            </div>
            <button class='input-group__button' @click='toggleIsAddingNewAuthor'>
              {{ state.isAddingAuthor ? 'Cancel' : 'Add New Author' }}
            </button>
          </div>

          <div class='input-group genre-input-group'>
            <div v-if='!state.isAddingGenre' class='input-group__content genre-input-group__existing'>
              <label for='book-genre'> genre </label>
              <select v-model='state.newBook.genre_id' name='genre_id' required>
                <option value='0'>&nbsp;</option>
                <option v-for='genre in props.genres' :key='`author-${genre.id}`' :value='genre.id'>{{ genre.name }}
                </option>
              </select>
            </div>
            <div v-else class='input-group__content genre-input-group__new'>
              <label for='genre-name'> new genre name </label>
              <input id='genre-name' v-model='state.newGenre.name' type='text' name='genreName'>
            </div>
            <button class='input-group__button' @click='toggleIsAddingNewGenre'>
              {{ state.isAddingGenre ? 'Cancel' : 'Add New Genre' }}
            </button>
          </div>
          <label for='book-isbn'> isbn </label>
          <input id='book-isbn' v-model='state.newBook.isbn' type='text' name='isbn' maxlength='13'>
          <label for='book-cover-image'> cover_image </label>
          <input id='book-cover-image' v-model='state.newBook.cover_image' type='text' name='cover_image'>
          <label for='book-qty-available'> quantity_available </label>
          <input
id='book-qty-available' v-model='state.newBook.quantity_available' type='number'
                 name='quantity_available' required>
          <label for='book-qty-rented'> quantity_rented </label>
          <input
id='book-qty-rented' v-model='state.newBook.quantity_rented' type='number' name='quantity_rented'
                 required>
        </fieldset>
        <input id='addBook' class='btn' type='button' value='Add New Book' @click='addBook'>
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

    &[disabled] {
      cursor: not-allowed;
    }
  }
}

</style>
