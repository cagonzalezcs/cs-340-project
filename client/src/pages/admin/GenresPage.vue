<script setup>
import { reactive } from 'vue';
import AddGenreForm from '../../components/genres/AddGenreForm.vue';
import EditGenreForm from '../../components/genres/EditGenreForm.vue';
import DeleteGenreForm from '../../components/genres/DeleteGenreForm.vue';

let state = reactive({
  isAddGenreModalActive: false,
  isEditGenreModalActive: false,
  isDeleteGenreModalActive: false,
});

const toggleAddGenreModal = () => {
  state.isAddGenreModalActive = !state.isAddGenreModalActive;
};
const toggleEditGenreModal = () => {
  state.isEditGenreModalActive = !state.isEditGenreModalActive;
};
const toggleDeleteGenreModal = () => {
  state.isDeleteGenreModalActive = !state.isDeleteGenreModalActive;
};
</script>

<template>
  <div id='header'>
    <h1>Genres</h1>
    <p>View All Genres | Add New Genres | Update Genres | Delete Genres</p>
  </div>
  <div id='browseGenres'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>name</th>
        <th></th>
        <th><button @click='toggleAddGenreModal'>Add Genre</button></th>
      </tr>
      <tr>
        <td>1</td>
        <td>Non-Fiction</td>
        <td><button @click='toggleEditGenreModal'>Edit</button></td>
        <td><button @click='toggleDeleteGenreModal'>Delete</button></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Fiction</td>
        <td><button @click='toggleEditGenreModal'>Edit</button></td>
        <td><button @click='toggleDeleteGenreModal'>Delete</button></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Horror</td>
        <td><button @click='toggleEditGenreModal'>Edit</button></td>
        <td><button @click='toggleDeleteGenreModal'>Delete</button></td>
      </tr>
      <tr>
        <td>4</td>
        <td>Comedy</td>
        <td><button @click='toggleEditGenreModal'>Edit</button></td>
        <td><button @click='toggleDeleteGenreModal'>Delete</button></td>
      </tr>
      <tr>
        <td>5</td>
        <td>Drama</td>
        <td><button @click='toggleEditGenreModal'>Edit</button></td>
        <td><button @click='toggleDeleteGenreModal'>Delete</button></td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-genre-form :is-add-genre-modal-active='state.isAddGenreModalActive' @toggle-add-genre-modal='toggleAddGenreModal' />
  <edit-genre-form :is-edit-genre-modal-active='state.isEditGenreModalActive' @toggle-edit-genre-modal='toggleEditGenreModal' />
  <delete-genre-form :is-delete-genre-modal-active='state.isDeleteGenreModalActive' @toggle-delete-genre-modal='toggleDeleteGenreModal' />

</template>
