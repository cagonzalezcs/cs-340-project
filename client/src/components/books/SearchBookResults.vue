<script setup>
import AppModal from '../../components/AppModal.vue';

const props = defineProps({
  isBooksResultsModalActive: Boolean,
  searchQuery: {type: String, default: ''},
  books: { type: Array, default: () => [], required: false },
});

const emit = defineEmits(['toggleBookResultsModal']);

const toggleBookResultsModal = () => {
  emit('toggleBookResultsModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isBooksResultsModalActive' @toggle-active-status='toggleBookResultsModal'>
    <h1 class='font-bold text-3xl mb-8'>Search Results</h1>
    <table
      v-if='props.books && props.books.length' border='1' cellpadding='5'
      style='margin-left: auto; margin-right: auto;'
      class='app-table mb-4'
    >
      <tr>
        <th>id</th>
        <th>title</th>
        <th>authors</th>
        <th>genre</th>
        <th>isbn</th>
        <th>cover_image</th>
        <th>quantity_available</th>
        <th>quantity_rented</th>
      </tr>
      <tr v-for='book in props.books' :key='`book-${book.id}`'>
        <td> {{ book.id }}</td>
        <td> {{ book.title }}</td>
        <td> {{ book.authors }}</td>
        <td> {{ book.genre }}</td>
        <td> {{ book.isbn }}</td>
        <td><img :src='book.cover_image' :alt='`Cover for ${book.title}`' class='w-14 h-auto mx-auto' width='56' height='88'></td>
        <td> {{ book.quantity_available }}</td>
        <td> {{ book.quantity_rented }}</td>
      </tr>
    </table>
    <button style="margin: 20px auto 0;" class='app-button app-button--accept' @click='toggleBookResultsModal'>Close Results</button>
  </app-modal>
</template>

<style>
button {
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
