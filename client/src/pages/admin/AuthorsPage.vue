<script setup>
import { reactive } from 'vue';
import AddAuthorForm from '../../components/authors/AddAuthorForm.vue';
import EditAuthorForm from '../../components/authors/EditAuthorForm.vue';
import DeleteAuthorForm from '../../components/authors/DeleteAuthorForm.vue';
import AuthorBookList from '../../components/authors/AuthorBookList.vue';

let state = reactive({
  isAddAuthorModalActive: false,
  isEditAuthorModalActive: false,
  isDeleteAuthorModalActive: false,
  isAuthorBookListModalActive: false,

});

const toggleAddAuthorModal = () => {
  state.isAddAuthorModalActive = !state.isAddAuthorModalActive;
};
const toggleEditAuthorModal = () => {
  state.isEditAuthorModalActive = !state.isEditAuthorModalActive;
};
const toggleDeleteAuthorModal = () => {
  state.isDeleteAuthorModalActive = !state.isDeleteAuthorModalActive;
};
const toggleAuthorBookListModal = () => {
  state.isAuthorBookListModalActive = !state.isAuthorBookListModalActive;
};
</script>

<template>
  <div id='header'>
    <h1>Authors</h1>
    <p>View All Authors | Add New Authors | Update Authors | Delete Authors</p>
  </div>
  <div id='browseAuthors'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>birth_date</th>
        <th>books</th>
        <th></th>
        <th><button @click='toggleAddAuthorModal'>Add Author</button></th>
      </tr>
      <tr>
        <td>1</td>
        <td>Adiana Pavlishchev</td>
        <td>2020-07-11</td>
        <td><button @click='toggleAuthorBookListModal'>View All Titles</button></td>
        <td><button @click='toggleEditAuthorModal'>Edit</button></td>
        <td><button @click='toggleDeleteAuthorModal'>Delete</button></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Perren Benzi</td>
        <td>2020-11-16</td>
        <td><button @click='toggleAuthorBookListModal'>View All Titles</button></td>
        <td><button @click='toggleEditAuthorModal'>Edit</button></td>
        <td><button @click='toggleDeleteAuthorModal'>Delete</button></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Berne Yele</td>
        <td>2019-03-22</td>
        <td><button @click='toggleAuthorBookListModal'>View All Titles</button></td>
        <td><button @click='toggleEditAuthorModal'>Edit</button></td>
        <td><button @click='toggleDeleteAuthorModal'>Delete</button></td>
      </tr>
      <tr>
        <td>4</td>
        <td>Robbi Feild</td>
        <td>2020-01-06</td>
        <td><button @click='toggleAuthorBookListModal'>View All Titles</button></td>
        <td><button @click='toggleEditAuthorModal'>Edit</button></td>
        <td><button @click='toggleDeleteAuthorModal'>Delete</button></td>
      </tr>
      <tr>
        <td>5</td>
        <td>Thomasin Seakin</td>
        <td>2019-08-11</td>
        <td><button @click='toggleAuthorBookListModal'>View All Titles</button></td>
        <td><button @click='toggleEditAuthorModal'>Edit</button></td>
        <td><button @click='toggleDeleteAuthorModal'>Delete</button></td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-author-form :is-add-author-modal-active='state.isAddAuthorModalActive' @toggle-add-author-modal='toggleAddAuthorModal' />
  <edit-author-form :is-edit-author-modal-active='state.isEditAuthorModalActive' @toggle-edit-author-modal='toggleEditAuthorModal' />
  <delete-author-form :is-delete-author-modal-active='state.isDeleteAuthorModalActive' @toggle-delete-author-modal='toggleDeleteAuthorModal' />
  <author-book-list :is-author-book-list-modal-active='state.isAuthorBookListModalActive' @toggle-author-book-list-modal='toggleAuthorBookListModal' />

</template>
