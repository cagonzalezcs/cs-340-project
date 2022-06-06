<script setup>
import { onMounted, reactive, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import AddBookForm from '../../components/books/AddBookForm.vue';
import UpdateBookForm from '../../components/books/UpdateBookForm.vue';
import DeleteBookForm from '../../components/books/DeleteBookForm.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';

onMounted(() => {
  checkUserIsAdmin()
    .then(() => {
      getBooks().then(() => {
        getAuthors();
        getGenres();
      });
    });
});

let state = reactive({
  isAddBookModalActive: false,
  isUpdateBookModalActive: false,
  isDeleteBookModalActive: false,
  books: [],
  authors: [],
  genres: [],
  currentlySelectedBookIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleAddBookModal = () => {
  state.isAddBookModalActive = !state.isAddBookModalActive;
};
const toggleUpdateBookModal = (bookIndex) => {
  if (!isNaN(bookIndex)) {
    state.currentlySelectedBookIndex = bookIndex;
  }

  state.isUpdateBookModalActive = !state.isUpdateBookModalActive;
};
const toggleDeleteBookModal = (bookIndex) => {
  if (!isNaN(bookIndex)) {
    state.currentlySelectedBookIndex = bookIndex;
  }

  state.isDeleteBookModalActive = !state.isDeleteBookModalActive;
};

function setBooks(books) {
  if (books?.length) {
    state.books = books;
  }
}

function setAuthors(authors) {
  if (authors?.length) {
    state.authors = authors;
  }
}

function setGenres(genres) {
  if (genres?.length) {
    state.genres = genres;
  }
}

async function getBooks() {
  const bookUrl = `${ baseUrl }books`;
  try {
    const response = await fetch(bookUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }
    setBooks(data);
  } catch (error) {
    console.error(error);
  }
}

async function getAuthors() {
  const authorUrl = `${ baseUrl }authors`;
  try {
    const responseAuthors = await fetch(authorUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const authorData = await responseAuthors.json();
    if (!authorData.length) {
      return;
    }
    setAuthors(authorData);
  } catch (error) {
    console.error(error);
  }
}

async function getGenres() {
  const genreUrl = `${ baseUrl }genres`;
  try {
    const responseGenres = await fetch(genreUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const genreData = await responseGenres.json();
    if (!genreData.length) {
      return;
    }
    setGenres(genreData);
  } catch (error) {
    console.error(error);
  }
}

const currentlySelectedBook = computed(() => {
  if (state.currentlySelectedBookIndex < 0) {
    return [];
  }

  return state.books[state.currentlySelectedBookIndex];
});

const handleBookAdded = () => {
  // TODO: Might consider handling this differently, passing back required data from the POST request rather then re-querying all books.
  getBooks();
};

const handleBookDeleted = () => {
  state.books.splice(state.currentlySelectedBookIndex, 1);
  state.currentlySelectedBookIndex = 0;
};

const handleBookUpdated = () => {
  getBooks();
};

</script>

<template>
  <admin-layout>
    <header class="app-header">
      <h1 class="app-header__heading">Books</h1>
      <div class="app-header__actions">
        <router-link
          to='/admin/search-books'
          class="app-header__link">Search All Books
        </router-link>
        <button class='app-header__button' @click='toggleAddBookModal'>Add New Book</button>
      </div>
    </header>


    <div id='browse'>
      <table
        v-if='state.books && state.books.length' border='1' cellpadding='5'
        style='margin-left: auto; margin-right: auto;'
        class='app-table'
      >
        <tr>
          <th>id</th>
          <th>title</th>
          <th>authors</th>
          <th>genre</th>
          <th>isbn</th>
          <th>cover image</th>
          <th>quantity available</th>
          <th>quantity rented</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for='(book, index) in state.books' :key='`book-${book.id}`'>
          <td> {{ book.id }}</td>
          <td> {{ book.title }}</td>
          <td> {{ book.authors }}</td>
          <td> {{ book.genre }}</td>
          <td> {{ book.isbn }}</td>
          <td><img :src="book.cover_image" width='45' class='mx-auto'/></td>
          <td> {{ book.quantity_available }}</td>
          <td> {{ book.quantity_rented }}</td>
          <td colspan='2'>
            <div class='app-table__actions'>
              <button @click='toggleUpdateBookModal(index)'>Edit Book</button>
              <button class='red-button' @click='toggleDeleteBookModal(index)'>Delete Book</button>
            </div>
          </td>
        </tr>
      </table>
    </div><!-- browse -->

    <add-book-form
      :is-add-book-modal-active='state.isAddBookModalActive'
      :authors='state.authors'
      :genres='state.genres'
      @toggle-add-book-modal='toggleAddBookModal'
      @book-added='handleBookAdded'
    />
    <update-book-form
      :is-update-book-modal-active='state.isUpdateBookModalActive'
      :book='currentlySelectedBook'
      :authors='state.authors'
      :genres='state.genres'
      @toggle-update-book-modal='toggleUpdateBookModal'
      @book-updated='handleBookUpdated' />
    <delete-book-form
      :is-delete-book-modal-active='state.isDeleteBookModalActive'
      :book='currentlySelectedBook'
      @toggle-delete-book-modal='toggleDeleteBookModal'
      @book-deleted='handleBookDeleted' />
  </admin-layout>
</template>

