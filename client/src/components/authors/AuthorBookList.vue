<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  booksByAuthor: [],
});

const props = defineProps({
  'isAuthorBookListModalActive': Boolean,
  author: {
    type: Object, default: () => {
    }, required: false,
  },
});

const emit = defineEmits(['toggleAuthorBookListModal']);

const toggleAuthorBookListModal = () => {
  emit('toggleAuthorBookListModal');
};

function setBooksByAuthor(books) {
  if (books?.length) {
    state.booksByAuthor = books;
  }
}

watch(() => props.isAuthorBookListModalActive, async () => {
  if (!props.isAuthorBookListModalActive) {
    return;
  }
  let authorId = props.author.id;
  try {
    const response = await fetch(`${ baseUrl }authors/books/${ authorId }`, {
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
    setBooksByAuthor(data);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <app-modal :is-modal-active='props.isAuthorBookListModalActive' @toggle-active-status='toggleAuthorBookListModal'>
    <div v-if='author' id='bookAuthorsTable'>
      <h1 class='text-xl mb-1 block font-bold'>Books By Author</h1>
      <p class='mb-4'>View All Books Written by author_id: {{ author.id }} </p>
    </div>
    <div id='viewBookAuthors'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
        <tr>
          <th>book_id</th>
          <th>title</th>
          <th>isbn</th>
        </tr>
        <tr v-for='book in state.booksByAuthor' :key='book.id'>
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.isbn }}</td>
        </tr>
      </table>
    </div><!-- viewBookAuthors -->
  </app-modal>
</template>
