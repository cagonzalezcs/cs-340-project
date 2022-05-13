<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isAuthorBookListModalActive': Boolean,
});
const emit = defineEmits(['toggleAuthorBookListModal']);

const toggleAuthorBookListModal = () => {
  emit('toggleAuthorBookListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isAuthorBookListModalActive' @toggle-active-status='toggleAuthorBookListModal'>
    <div id='bookAuthorsTable'>
      <h1>Books By Author</h1>
      <p>View All Books Written by author_id: 1</p>
    </div>
    <div id='viewBookAuthors'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>book_id</th>
          <th>title</th>
          <th>isbn</th>
        </tr>
        <tr>
          <td>1</td>
          <td>lobortis vel dapibus at diam nam tristique tortor ...</td>
          <td>488010340-3</td>
        </tr>
        <tr>
          <td>5</td>
          <td>nulla ultrices aliquet maecenas</td>
          <td>941228042-4</td>
        </tr>
        <tr>
          <td>9</td>
          <td>auctor gravida sem praesent id</td>
          <td>363704582-6</td>
        </tr>
      </table>
    </div><!-- viewBookAuthors -->
  </app-modal>
</template>
