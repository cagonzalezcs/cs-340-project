<script setup>
import { reactive, onMounted } from 'vue';
import SearchBookResults from '../../components/books/SearchBookResults.vue';

let state = reactive({
  isBooksResultsModalActive: false,
  foundBooks: [],
  authors: [],
  genres: [],
  selectedTitle: '',
  selectedGenreId: 0,
  selectedAuthorId: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleBookResultsModal = () => {
  state.isBooksResultsModalActive = !state.isBooksResultsModalActive;
};

function setBooks(books) {
  if (books?.length) {
    state.books = books;
  }
}

function setAuthors(authors) {
  if (authors?.length) {
    state.authors = authors;
    state.selectedAuthorId = authors[0].id;
  }
}

function setGenres(genres) {
  if (genres?.length) {
    state.genres = genres;
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
    alert('Must enter a book title to search');
    return;
  }

  const searchTitleUrl = `${ baseUrl }books/search/title/${encodeURIComponent(state.selectedTitle)}`;
  try {
    const response = await fetch(searchTitleUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const bookData = await response.json();
    if (!bookData.length) {
      alert('No results found, try another query.');
      return;
    }

    setBooks(bookData);
    toggleBookResultsModal();
  } catch (error) {
    console.error(error);
  }
};

const searchByAuthor = async () => {
  const searchAuthorUrl = `${ baseUrl }books/search/author/${state.selectedAuthorId}`;
  try {
    const response = await fetch(searchAuthorUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const bookData = await response.json();
    if (!bookData.length) {
      return;
    }

    setBooks(bookData);
    toggleBookResultsModal();
  } catch (error) {
    console.error(error);
  }
};

const searchByGenre = async () => {
  const searchGenreUrl = `${ baseUrl }books/search/genre/${state.selectedGenreId}`;
  try {
    const response = await fetch(searchGenreUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const bookData = await response.json();
    if (!bookData.length) {
      return;
    }

    setBooks(bookData);
    toggleBookResultsModal();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getAuthors();
  await getGenres();
});
</script>

<template>
  <div>
    <h1>Search Books</h1>
  </div>
  <div id='search-title' style='display: block'>
    <form id='searchBookTitles' method='POST' @submit.prevent>
      <legend><strong>Enter a Title</strong></legend>
      <fieldset class='fields'>
        <label for='book-title'> Title: </label>
        <input id='book-title' v-model='state.selectedTitle' type='text' name='book-title'>
      </fieldset>
      <input id='BookSearchTitle' class='btn' type='submit' value='Search for Books by Title' @click='searchByTitle'>
    </form>
  </div><!-- search by title -->
  <br />
  <div v-if='state?.authors' id='search-author' style='display: block'>
    <form id='searchBookTitles' method='POST' @submit.prevent>
      <legend><strong>Choose an Author</strong></legend>
      <fieldset class='fields'>
        <label for='author_id'> Genre: </label>
        <select id='author_id' v-model='state.selectedAuthorId'>
          <option v-for='author of state.authors' :key='`author-${author.id}`' :value='author.id'>{{ author.name }}
          </option>
        </select>
      </fieldset>
      <input id='BookSearchAuthor' class='btn' type='submit' value='Search for Books by Author' @click='searchByAuthor'>
    </form>
  </div><!-- search by author -->
  <br />
  <div v-if='state?.genres' id='search-genre' style='display: block'>
    <form id='searchBookGenres' method='POST' @submit.prevent>
      <legend><strong>Select a Genre</strong></legend>
      <fieldset class='fields'>
        <label for='genre-id'> Genre: </label>
        <select id='genre-id' v-model='state.selectedGenreId'>
          <option v-for='genre of state.genres' :key='`genre-${genre.id}`' :value='genre.id'>{{ genre.name }}</option>
        </select>
      </fieldset>
      <input id='BookSearchGenre' class='btn' type='submit' value='Search for Books by Genre' @click='searchByGenre'>
    </form>
  </div><!-- search by genre -->
  <search-book-results :books='state.books' :is-books-results-modal-active='state.isBooksResultsModalActive' @toggle-book-results-modal='toggleBookResultsModal' />
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
    padding: 10px 25px 35px;
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
