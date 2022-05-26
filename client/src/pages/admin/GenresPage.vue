<script setup>
import { onMounted, reactive, computed } from 'vue';
import AddGenreForm from '../../components/genres/AddGenreForm.vue';
import EditGenreForm from '../../components/genres/EditGenreForm.vue';
import DeleteGenreForm from '../../components/genres/DeleteGenreForm.vue';

let state = reactive({
  isAddGenreModalActive: false,
  isEditGenreModalActive: false,
  isDeleteGenreModalActive: false,
  genres: [], 
  currentlySelectedGenreIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleAddGenreModal = () => {
  state.isAddGenreModalActive = !state.isAddGenreModalActive;
};

const toggleEditGenreModal = (genreIndex) => {
  if (!isNaN(genreIndex)) {
    state.currentlySelectedGenreIndex = genreIndex;
  }
  state.isEditGenreModalActive = !state.isEditGenreModalActive;
};
const toggleDeleteGenreModal = (genreIndex) => {
  if (!isNaN(genreIndex)) {
    state.currentlySelectedGenreIndex = genreIndex
  }

  state.isDeleteGenreModalActive = !state.isDeleteGenreModalActive;
};

function setGenre(genres) {
  if (genres?.length) {
    state.genres = genres;
  }
};

async function getGenres() {
  const genreUrl = `${ baseUrl }genres`;
  try {
    const response = await fetch(genreUrl, {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json',
      },
    });
    const genreData = await response.json();
    if (!genreData.length) {
      return;
    }
    setGenre(genreData);
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getGenres();
});

const currentlySeletedGenre = computed(() => {
  if (state.currentlySelectedGenreIndex < 0) {
    return [];
  }
  return state.genres[state.currentlySelectedGenreIndex];
});

const handleGenreAdded = () => {
  getGenres();
};

const handleGenreUpdated = (updatedGenre) => {
  getGenres();
};

const handleGenreDeleted = (updatedGenre) => {
  getGenres();
};

</script>

<template>
  <div id='header'>
    <h1>Genres</h1>
    <p>View All Genres | Add New Genres | Update Genres | Delete Genres</p>
  </div>
  <div id='browseGenres'>
    <table 
      v-if='state.genres && state.genres.length' border='1' cellpadding='5' 
      style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>name</th>
        <th></th>
        <th><button @click='toggleAddGenreModal'>Add New Genre</button></th>
      </tr>
      <tr v-for='(genre, index) in state.genres' :key='genre.id'>
        <td>{{ genre.id }}</td>
        <td>{{ genre.name }}</td>
        <td><button @click='toggleEditGenreModal(index)'>Edit Genre</button></td>
        <td><button @click='toggleDeleteGenreModal(index)'>Delete Genre</button></td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-genre-form 
    :is-add-genre-modal-active='state.isAddGenreModalActive' 
    @toggle-add-genre-modal='toggleAddGenreModal' 
    @genre-added='handleGenreAdded'
  />
  <edit-genre-form 
    :is-edit-genre-modal-active='state.isEditGenreModalActive' 
    :genre='currentlySeletedGenre'
    @toggle-edit-genre-modal='toggleEditGenreModal' 
    @genre-updated='handleGenreUpdated'
  />
  <delete-genre-form 
    :is-delete-genre-modal-active='state.isDeleteGenreModalActive' 
    :genre='currentlySeletedGenre'
    @toggle-delete-genre-modal='toggleDeleteGenreModal' 
  />

</template>
