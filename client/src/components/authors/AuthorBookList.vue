<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';

const baseUrl = import.meta.env.VITE_SERVER_URI;
const authorBooksUrl = `${ baseUrl }authors/books`;

const props = defineProps({
  'isAuthorBookListModalActive': Boolean,
  author: { type: Object, default: () => {}, required: false}, 
  books: { type: Array, default: () => [] }
});

const emit = defineEmits(['toggleAuthorBookListModal']);

const toggleAuthorBookListModal = () => {
  emit('toggleAuthorBookListModal');
};

function setBooks(books) {
  if (books?.length) {
    props.books = books
  }
}

watch(() => props.isAuthorBookListModalActive, async () => {
  if (!props.isAuthorBookListModalActive) {
    return 
  }
  let authorId = props.author.authorId 
  try {
    const response = await fetch(`${ baseUrl }authors/books/${ authorId }`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data)
    if (!data.length) {
      return;
    }
    setBooks(data);
  } catch(error) {
    console.error(error)
  }
});

</script>

<template>
  <app-modal :is-modal-active='props.isAuthorBookListModalActive' @toggle-active-status='toggleAuthorBookListModal'>
    <div v-if='author' id='bookAuthorsTable'>
      <h1>Books By Author</h1>
      <p>View All Books Written by author_id: {{ author.id }} </p>
    </div>
    <div id='viewBookAuthors'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>book_id</th>
          <th>title</th>
          <th>isbn</th>
        </tr>
        <tr v-for='book in props.books' :key='book.id'>
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.isbn }}</td>
        </tr>
      </table>
    </div><!-- viewBookAuthors -->
  </app-modal>
</template>
