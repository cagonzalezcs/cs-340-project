<script setup>
import { computed, onMounted, reactive } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import AddAuthorForm from '../../components/authors/AddAuthorForm.vue';
import EditAuthorForm from '../../components/authors/EditAuthorForm.vue';
import DeleteAuthorForm from '../../components/authors/DeleteAuthorForm.vue';
import AuthorBookList from '../../components/authors/AuthorBookList.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import { useAdminStore } from '../../stores/admin';

onMounted(async () => {
  await checkUserIsAdmin();
  await getAuthors();
});

let state = reactive({
  isAddAuthorModalActive: false,
  isEditAuthorModalActive: false,
  isDeleteAuthorModalActive: false,
  isAuthorBookListModalActive: false,
  currentlySelectedAuthorIndex: 0,
});

const adminStore = useAdminStore();
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
  adminStore.authors = authors?.length ? authors : [];
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

  return adminStore.authors[state.currentlySelectedAuthorIndex];
});

const handleAuthorAdded = () => {
  getAuthors();
};

const handleAuthorUpdated = () => {
  getAuthors();
};

const handleAuthorDeleted = () => {
  adminStore.authors.splice(state.currentlySelectedAuthorIndex, 1);
  state.currentlySelectedAuthorIndex = 0;
};

</script>

<template>
  <admin-layout>
    <header class='app-header'>
      <h1 class='app-header__heading'>Authors</h1>
      <div class='app-header__actions'>
        <button class='app-header__button' @click='toggleAddAuthorModal'>Add New Author</button>
      </div>
    </header>
    <div v-if='adminStore.authors?.length' id='browseAuthors'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>birth date</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for='(author, index) in adminStore.authors' :key='author.id'>
          <td>{{ author.id }}</td>
          <td>{{ author.name }}</td>
          <td>{{ author.birth_date }}</td>
          <td colspan='3'>
            <div class='app-table__actions'>
              <button @click='toggleAuthorBookListModal(index)'>View All Author Books</button>
              <button @click='toggleEditAuthorModal(index)'>Edit Author</button>
              <button class='red-button' @click='toggleDeleteAuthorModal(index)'>Delete Author</button>
            </div>
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
