<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;

const props = defineProps({
  isUpdateBookModalActive: Boolean,
  book: { type: Object, default: () => {}, required: false },
  authors: { type: Array, default: () => []},
  genres: { type: Array, default: () => []},
});
const emit = defineEmits(['toggleUpdateBookModal', 'bookUpdated']);
const state = reactive({
  isAddingAuthor: false,
  isAddingGenre: false,
  updatedBook: {
    title: '',
    authors: '',
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


watch(() => props.isUpdateBookModalActive, async () => {
  if (!props.isUpdateBookModalActive) {
    return;
  }

  let genreId = props.genres.find((genre) => props.book.genre === genre.name)?.id;
  const authors = props.book.authors.split(', ');
  state.updatedBook = {
    title: props.book.title,
    authors: authors,
    genre_id: genreId,
    isbn: props.book.isbn,
    cover_image: props.book.cover_image,
    quantity_available: props.book.quantity_available,
    quantity_rented: props.book.quantity_rented,
  };
});

const toggleIsAddingNewAuthor = () => {
  state.isAddingAuthor = !state.isAddingAuthor;
};
const toggleIsAddingNewGenre = () => {
  state.isAddingGenre = !state.isAddingGenre;
};
const toggleUpdateBookModal = () => {
  emit('toggleUpdateBookModal');
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
      });
    } catch(e) {
      return new Error({ message: 'Error adding new author' });
    }
  }
};

const toast = useToast();

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
      return new Error({ message: 'Error adding new genre' });
    }
  }
};

const updateBook = async () => {
  try {
    await addNewAuthor(state.newAuthor?.name, state.newAuthor?.birth_date);
    await addNewGenre(state.newGenre?.name);
    const bookUpdates = {
      title: state.updatedBook.title,
      authors: state.newAuthor.name ? [state.newAuthor.name] : state.updatedBook.authors,
      genre_id: state.newGenre.name ||  state.updatedBook.genre_id,
      isbn:  state.updatedBook.isbn,
      cover_image:  state.updatedBook.cover_image,
      quantity_available:  state.updatedBook.quantity_available,
      quantity_rented:  state.updatedBook.quantity_rented,
    };
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }/books/${ props.book.id }`, {
      method: 'PUT',
      body: JSON.stringify(bookUpdates),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      }
    });

    if (response.status !== 200) {
      toast.error('ERROR: Something went wrong with updating this book.');
      return;
    }

    toast.success('Book successfully updated');
    emit('bookUpdated', {...state.updatedBook, id: props.book.id});
    state.newAuthor = {
      name: '',
      birth_date: '',
    };
    state.newGenre = {
      name: '',
    };
    state.isAddingAuthor = false;
    state.isAddingGenre =false;
    toggleUpdateBookModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isUpdateBookModalActive' @toggle-active-status='toggleUpdateBookModal'>
    <div v-if='book' id='update'>
      <form id='updateBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Update Book</strong></legend>
        <fieldset class='fields'>
          <label for='book-title'> title </label>
          <input id='book-title' v-model='state.updatedBook.title' type='text' name='title' required>
          <div class='input-group author-input-group'>
            <div v-if='!state.isAddingAuthor' class='input-group__content author-input-group__existing' >
              <label for='author'> author: </label>
              <select id='author' v-model='state.updatedBook.authors' required multiple>
                <option v-for='author in props.authors' :key='`author-${author.id}`' :selected='book.authors.includes(author.name)'>{{ author.name }}</option>
              </select>
            </div>
            <div v-else class='input-group__content author-input-group__new'>
              <label for='author-name'> new author name </label>
              <input id='author-name' v-model='state.newAuthor.name' type='text' name='name'>
              <label for='author-birth-date'> author birth_date </label>
              <input id='author-birth-date' v-model='state.newAuthor.birth_date' type='date' name='birth_date'>
            </div>
            <button class='input-group__button app-button--neutral' @click.prevent='toggleIsAddingNewAuthor'>
              {{ state.isAddingAuthor ? 'Cancel' : 'Add New Author' }}
            </button>
          </div>

          <div class='input-group genre-input-group'>
            <div v-if='!state.isAddingGenre' class='input-group__content genre-input-group__existing'>
              <label for='book-genre'> genre </label>
              <select id='book-genre' v-model='state.updatedBook.genre_id' name='genre_id' required>
                <option value='0'>&nbsp;</option>
                <option v-for='genre in props.genres' :key='`author-${genre.id}`' :value="genre.id">{{ genre.name }}
                </option>
              </select>
            </div>
            <div  v-else  class='input-group__content genre-input-group__new'>
              <label for='genre-name'> new genre name </label>
              <input id='genre-name' v-model='state.newGenre.name' type='text' name='genreName'>
            </div>
            <button class='input-group__button app-button--neutral' @click.prevent='toggleIsAddingNewGenre'>
              {{ state.isAddingGenre ? 'Cancel' : 'Add New Genre' }}
            </button>
          </div>
          <label for='book-isbn'> isbn </label>
          <input id='book-isbn' v-model='state.updatedBook.isbn' type='text' name='isbn' maxlength='13'>
          <label for='book-cover-image'> cover image </label>
          <input id='book-cover-image' v-model='state.updatedBook.cover_image' type='text' name='cover_image'>
          <label for='book-qty-available'> quantity available </label>
          <input v-model='state.updatedBook.quantity_available' for='book-qty-available' type='number' name='quantity_available'>
          <label for='book-qty-rented'> quantity rented </label>
          <input id='book-qty-rented' v-model='state.updatedBook.quantity_rented' type='number' name='quantity_rented'>
        </fieldset>
        <input id='UpdateBook' class='app-button app-button--accept' type='submit' value='Update Book' @click='updateBook'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleUpdateBookModal'>
      </form>
    </div><!-- update -->
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
