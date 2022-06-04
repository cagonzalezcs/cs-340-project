<script setup>
import { computed, onMounted, reactive } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import AddAuthorForm from '../../components/authors/AddAuthorForm.vue';
import EditAuthorForm from '../../components/authors/EditAuthorForm.vue';
import DeleteAuthorForm from '../../components/authors/DeleteAuthorForm.vue';
import AuthorBookList from '../../components/authors/AuthorBookList.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';

onMounted(async () => {
  await checkUserIsAdmin();
  await getAuthors();
});

let state = reactive({
  isAddAuthorModalActive: false,
  isEditAuthorModalActive: false,
  isDeleteAuthorModalActive: false,
  isAuthorBookListModalActive: false,
  authors: [],
  currentlySelectedAuthorIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleAddAuthorModal = () => {
  state.isAddAuthorModalActive = !state.isAddAuthorModalActive;
};
const toggleEditAuthorModal = (authorIndex) => {
  if (!isNaN(authorIndex)) {
    state.currentlySelectedAuthorIndex = authorIndex;
  }
  state.isEditAuthorModalActive = !state.isEditAuthorModalActive;
};
const toggleDeleteAuthorModal = (authorIndex) => {
  if (!isNaN(authorIndex)) {
    state.currentlySelectedAuthorIndex = authorIndex;
  }

  state.isDeleteAuthorModalActive = !state.isDeleteAuthorModalActive;
};

const toggleAuthorBookListModal = (authorIndex) => {
  if (!isNaN(authorIndex)) {
    state.currentlySelectedAuthorIndex = authorIndex;
  }

  state.isAuthorBookListModalActive = !state.isAuthorBookListModalActive;
};

function setAuthor(authors) {
  if (authors?.length) {
    state.authors = authors;
  }
};

async function getAuthors() {
  const authorUrl = `${ baseUrl }authors`;
  try {
    const response = await fetch(authorUrl, {
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
    setAuthor(data);
  } catch (error) {
    console.error(error);
  }
}

const currentlySelectedAuthor = computed(() => {
  if (state.currentlySelectedAuthorIndex < 0) {
    return [];
  }

  return state.authors[state.currentlySelectedAuthorIndex];
});

const handleAuthorAdded = () => {
  getAuthors();
};

const handleAuthorUpdated = () => {
  getAuthors();
};

const handleAuthorDeleted = () => {
  state.authors.splice(state.currentlySelectedAuthorIndex, 1);
  state.currentlySelectedAuthorIndex = 0;
};

</script>

<template>
  <admin-layout>
    <div id='header'>
      <h1>Authors</h1>
    </div>
    <div v-if='state.authors?.length' id='browseAuthors'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>birth_date</th>
          <th>books</th>
          <th></th>
          <th>
            <button @click='toggleAddAuthorModal'>Add New Author</button>
          </th>
        </tr>
        <tr v-for='(author, index) in state.authors' :key='author.id'>
          <td>{{ author.id }}</td>
          <td>{{ author.name }}</td>
          <td>{{ author.birth_date }}</td>
          <td>
            <button @click='toggleAuthorBookListModal(index)'>View All Author Titles</button>
          </td>
          <td>
            <button @click='toggleEditAuthorModal(index)'>Edit Author</button>
          </td>
          <td>
            <button @click='toggleDeleteAuthorModal(index)'>Delete Author</button>
          </td>
        </tr>
      </table>
    </div><!-- browse -->

    <add-author-form
      :is-add-author-modal-active='state.isAddAuthorModalActive'
      @toggle-add-author-modal='toggleAddAuthorModal'
      @author-added='handleAuthorAdded'
    />
    <edit-author-form
      :is-edit-author-modal-active='state.isEditAuthorModalActive'
      :author='currentlySelectedAuthor'
      @toggle-edit-author-modal='toggleEditAuthorModal'
      @author-updated='handleAuthorUpdated'
    />
    <delete-author-form
      :is-delete-author-modal-active='state.isDeleteAuthorModalActive'
      :author='currentlySelectedAuthor'
      @toggle-delete-author-modal='toggleDeleteAuthorModal'
      @author-deleted='handleAuthorDeleted'
    />
    <author-book-list
      :is-author-book-list-modal-active='state.isAuthorBookListModalActive'
      :author='currentlySelectedAuthor'
      @toggle-author-book-list-modal='toggleAuthorBookListModal'
    />
  </admin-layout>
</template>
