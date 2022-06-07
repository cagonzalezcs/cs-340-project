<script setup>
import { onMounted, reactive, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import AddGenreForm from '../../components/genres/AddGenreForm.vue';
import EditGenreForm from '../../components/genres/EditGenreForm.vue';
import DeleteGenreForm from '../../components/genres/DeleteGenreForm.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import { useAdminStore } from '../../stores/admin';

const adminStore = useAdminStore();

onMounted(async () => {
  await checkUserIsAdmin();
  await getGenres();
});

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
    state.currentlySelectedGenreIndex = genreIndex;
  }

  state.isDeleteGenreModalActive = !state.isDeleteGenreModalActive;
};

function setGenre(genres) {
  adminStore.genres = genres?.length ? genres : [];
};

async function getGenres() {
  const genreUrl = `${ baseUrl }genres`;
  try {
    const response = await fetch(genreUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const genreData = await response.json();
    if (!genreData.length) {
      return;
    }
    setGenre(genreData);
  } catch (error) {
    console.error(error);
  }
}

const currentlySeletedGenre = computed(() => {
  if (state.currentlySelectedGenreIndex < 0) {
    return [];
  }
  return adminStore.genres[state.currentlySelectedGenreIndex];
});

const handleGenreAdded = () => {
  getGenres();
};

const handleGenreUpdated = () => {
  getGenres();
};

const handleGenreDeleted = () => {
  getGenres();
};

</script>

<template>
  <admin-layout>
    <header class='app-header'>
      <h1 class='app-header__heading'>Genres</h1>
      <div class='app-header__actions'>
        <button class='app-header__button' @click='toggleAddGenreModal'>Add New Genre</button>
      </div>
    </header>


    <div id='browseGenres'>
      <table
        v-if='adminStore.genres?.length' border='1' cellpadding='5'
        style='margin-left: auto; margin-right: auto;'
        class='app-table'
      >
        <tr>
          <th>id</th>
          <th>name</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for='(genre, index) in adminStore.genres' :key='genre.id'>
          <td>{{ genre.id }}</td>
          <td>{{ genre.name }}</td>
          <td colspan='2'>
            <div class='app-table__actions'>
              <button @click='toggleEditGenreModal(index)'>Edit Genre</button>
              <button class='red-button' @click='toggleDeleteGenreModal(index)'>Delete Genre</button>
            </div>
          </td>
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
      @genre-deleted='handleGenreDeleted'
    />
  </admin-layout>
</template>
