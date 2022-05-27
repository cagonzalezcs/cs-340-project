<script setup>
import { onMounted, reactive, computed } from 'vue';
import AddBookForm from '../../components/books/AddBookForm.vue';
import UpdateBookForm from '../../components/books/UpdateBookForm.vue';
import DeleteBookForm from '../../components/books/DeleteBookForm.vue';
import SearchBooksPageVue from './SearchBooksPage.vue';

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

function setBook(books) {
  if (books?.length) {
    state.books = books;
  }
}

function setAuthor(authors) {
  if (authors?.length) {
    state.authors = authors;
  }
}

function setGenre(genres) {
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
      },
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }
    setBook(data);
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
      },
    });
    const authorData = await responseAuthors.json();
    if (!authorData.length) {
      return;
    }
    setAuthor(authorData);
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
      },
    });
    const genreData = await responseGenres.json();
    if (!genreData.length) {
      return;
    }
    setGenre(genreData);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getBooks().then(() => {
    getAuthors();
    getGenres();
  });
});

const currentlySelectedBook = computed(() => {
  if ( state.currentlySelectedBookIndex < 0) {
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

const handleBookUpdated = (updatedBook) => {
  getBooks();
};

</script>

<template>
  <div>
    <h1>Books</h1>
    <router-link to='/admin/search-books' style='margin-right: 10px'>Search All Books</router-link>
    <br />
  </div>
  <div id='browse'>
    <table
      v-if='state.books && state.books.length' border='1' cellpadding='5'
      style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>authors</th>
        <th>genre</th>
        <th>isbn</th>
        <th>cover_image</th>
        <th>quantity_available</th>
        <th>quantity_rented</th>
        <th></th>
        <th>
          <button @click='toggleAddBookModal'>Add New Book</button>
        </th>
      </tr>
      <tr v-for='(book, index) in state.books' :key='book.id'>
        <td> {{ book.id }}</td>
        <td> {{ book.title }}</td>
        <td> {{ book.authors }}</td>
        <td> {{ book.genre }}</td>
        <td> {{ book.isbn }}</td>
        <td> {{ book.cover_image }}</td>
        <td> {{ book.quantity_available }}</td>
        <td> {{ book.quantity_rented }}</td>
        <td>
          <button @click='toggleUpdateBookModal(index)'>Edit Book</button>
        </td>
        <td>
          <button @click='toggleDeleteBookModal(index)'>Delete Book</button>
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
    @book-updated='handleBookUpdated'/>
  <delete-book-form
    :is-delete-book-modal-active='state.isDeleteBookModalActive'
    :book='currentlySelectedBook'
    @toggle-delete-book-modal='toggleDeleteBookModal'
    @book-deleted='handleBookDeleted' />

</template>

