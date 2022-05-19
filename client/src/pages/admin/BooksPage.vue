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
  currentlySelectedBookId: 1
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleAddBookModal = () => {
  state.isAddBookModalActive = !state.isAddBookModalActive;
};
const toggleUpdateBookModal = () => {
  state.isUpdateBookModalActive = !state.isUpdateBookModalActive;
};
const toggleDeleteBookModal = (bookId) => {
  if (bookId) {
    state.currentlySelectedBookId = bookId;
  }

  console.log(state.currentlySelectedBookId);

  state.isDeleteBookModalActive = !state.isDeleteBookModalActive;
};

function setBook(books) {
  if (books && books.length) {
    state.books = books;
    console.log(books);
  }
}

function setAuthor(authors) {
  if (authors && authors.length) {
    state.authors = authors;
  }
}

function setGenre(genres) {
  if (genres && genres.length) {
    state.genres = genres;
    console.log('meow');
  }
}

async function getBooks() {
  const bookUrl = baseUrl.concat('books');
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
  const authorUrl = baseUrl.concat('authors');
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
  const genreUrl = baseUrl.concat('genres');
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

// STILL TBD
onMounted(() => {
  getBooks().then(() => {
    getAuthors();
    getGenres();
  });
});

const currentlySelectedBook = computed(() => {
  return state.books[state.currentlySelectedBookId];
});

</script>

<template>
  <div>
    <h1>Books</h1>
    <p>View All Book Data | Add New Books | Update Books | Delete Books</p>
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
        <th>author</th>
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
      <tr v-for='book in state.books' :key='book.id'>
        <td> {{ book.id }}</td>
        <td> {{ book.title }}</td>
        <td> {{ book.author }}</td>
        <td> {{ book.genre }}</td>
        <td> {{ book.isbn }}</td>
        <td> {{ book.cover_image }}</td>
        <td> {{ book.quantity_available }}</td>
        <td> {{ book.quantity_rented }}</td>
        <td>
          <button @click='toggleUpdateBookModal'>Edit Book</button>
        </td>
        <td>
          <button @click='toggleDeleteBookModal(book.id)'>Delete Book</button>
        </td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-book-form
    :is-add-book-modal-active='state.isAddBookModalActive'
    :authors='state.authors'
    :genres='state.genres'
    @toggle-add-book-modal='toggleAddBookModal' />
  <update-book-form
    :is-update-book-modal-active='state.isUpdateBookModalActive'
    @toggle-update-book-modal='toggleUpdateBookModal' />
  <delete-book-form
    :is-delete-book-modal-active='state.isDeleteBookModalActive'
    :book='currentlySelectedBook'
    @toggle-delete-book-modal='toggleDeleteBookModal' />

</template>

