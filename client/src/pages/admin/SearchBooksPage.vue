<script setup>
import { reactive, onMounted } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware';
import SearchBookResults from '../../components/books/SearchBookResults.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import { useToast } from 'vue-toastification';
import { useAdminStore } from '../../stores/admin';

const adminStore = useAdminStore();

onMounted(async () => {
  await checkUserIsAdmin();
  if (!adminStore.authors.length) {
    await getAuthors();

  }
  if (!adminStore.genres.length) {
    await getGenres();
  }
});

let state = reactive({
  isBooksResultsModalActive: false,
  foundBooks: [],
  selectedTitle: '',
  selectedGenreId: 0,
  selectedAuthorId: 0,
});

const toast = useToast();

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleBookResultsModal = () => {
  state.isBooksResultsModalActive = !state.isBooksResultsModalActive;
};

function setFoundBooks(books) {
  if (books?.length) {
    state.foundBooks = books;
  }
}

function setAuthors(authors) {
  if (authors?.length) {
    adminStore.authors = authors;
    state.selectedAuthorId = authors[0].id;
  }
}

function setGenres(genres) {
  if (genres?.length) {
    adminStore.genres = genres;
    state.selectedGenreId = genres[0].id;
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

const searchByTitle = async () => {
  if (!state.selectedTitle) {
    toast.info('Must enter a book title to search');
    return;
  }

  const searchTitleUrl = `${ baseUrl }books/search/title/${ encodeURIComponent(state.selectedTitle) }`;
  try {
    const response = await fetch(searchTitleUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const bookData = await response.json();
    if (!bookData.length) {
      toast.info('No results found, please try another query.');
      return;
    }

    setFoundBooks(bookData);
    toggleBookResultsModal();
  } catch (error) {
    console.error(error);
  }
};

const searchByAuthor = async () => {
  const searchAuthorUrl = `${ baseUrl }books/search/author/${ state.selectedAuthorId }`;
  try {
    const response = await fetch(searchAuthorUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const bookData = await response.json();
    if (!bookData.length) {
      return;
    }

    setFoundBooks(bookData);
    toggleBookResultsModal();
  } catch (error) {
    console.error(error);
  }
};

const searchByGenre = async () => {
  const searchGenreUrl = `${ baseUrl }books/search/genre/${ state.selectedGenreId }`;
  try {
    const response = await fetch(searchGenreUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const bookData = await response.json();
    if (!bookData.length) {
      return;
    }

    setFoundBooks(bookData);
    toggleBookResultsModal();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <admin-layout>
    <header class='app-header'>
      <h1 class='app-header__heading'>Search Books</h1>
    </header>

    <div id='search-title' style='display: block' class='text-left'>
      <form id='searchBookTitles' class='app-form ml-0 mb-10' style='margin-left: 0' method='POST' @submit.prevent>
        <legend><strong>Enter a Title</strong></legend>
        <fieldset class='fields'>
          <label for='book-title'> Title: </label>
          <input id='book-title' v-model='state.selectedTitle' type='text' name='book-title'>
        </fieldset>
        <input
id='BookSearchTitle' class='btn' type='submit' style='margin-left: 0' value='Search for Books by Title'
               @click='searchByTitle'>
      </form>
    </div><!-- search by title -->
    <br />
    <div v-if='adminStore.authors' id='search-author' style='display: block' class='text-left'>
      <form id='searchBookTitles' class='app-form ml-0 mb-10' style='margin-left: 0' method='POST' @submit.prevent>
        <legend><strong>Choose an Author</strong></legend>
        <fieldset class='fields'>
          <label for='author_id'> Genre: </label>
          <select id='author_id' v-model='state.selectedAuthorId'>
            <option v-for='author of adminStore.authors' :key='`author-${author.id}`' :value='author.id'>{{ author.name }}
            </option>
          </select>
        </fieldset>
        <input
id='BookSearchAuthor' class='btn' style='margin-left: 0' type='submit' value='Search for Books by Author'
               @click='searchByAuthor'>
      </form>
    </div><!-- search by author -->
    <br />
    <div v-if='adminStore.genres' id='search-genre' style='display: block' class='text-left'>
      <form id='searchBookGenres' class='app-form ml-0 mb-10' style='margin-left: 0' method='POST' @submit.prevent>
        <legend><strong>Select a Genre</strong></legend>
        <fieldset class='fields'>
          <label for='genre-id'> Genre: </label>
          <select id='genre-id' v-model='state.selectedGenreId'>
            <option v-for='genre of adminStore.genres' :key='`genre-${genre.id}`' :value='genre.id'>{{ genre.name }}</option>
          </select>
        </fieldset>
        <input
id='BookSearchGenre' class='btn' type='submit' style='margin-left: 0' value='Search for Books by Genre'
               @click='searchByGenre'>
      </form>
    </div><!-- search by genre -->
    <search-book-results
:books='state.foundBooks' :is-books-results-modal-active='state.isBooksResultsModalActive'
                         @toggle-book-results-modal='toggleBookResultsModal' />
  </admin-layout>
</template>

<style lang='scss' scoped>
form {
  width: 600px;
  margin-left: auto;
  margin-right: auto;

  .fields {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 10px 0 10px;
    margin-bottom: 20px;

    label {
      margin-top: 10px;
      margin-bottom: 3px;
      font-weight: 500;
    }
  }

  input[type="submit"],
  input[type="button"] {
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>

<style lang='scss' scoped>
.app-form {
  @apply bg-neutral-100 border-2 border-neutral-200 px-10 py-8 shadow-lg rounded max-w-4xl w-full;
}
</style>
