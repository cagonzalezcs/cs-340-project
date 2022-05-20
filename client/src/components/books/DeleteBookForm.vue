<script setup>
import AppModal from '../../components/AppModal.vue';

const props = defineProps({
  isDeleteBookModalActive: Boolean,
  book: { type: Object, default: null, required: false },
});
const emit = defineEmits(['toggleDeleteBookModal', 'bookDeleted']);

const toggleDeleteBookModal = () => {
  emit('toggleDeleteBookModal');
};

const deleteBook = async () => {
  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }/books/${ props.book.id }`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

    if (response.status !== 200) {
      alert('There was an error in deleting your book. Please try again later');
      return;
    }

    alert('Successfully Deleted');
    emit('bookDeleted');
    toggleDeleteBookModal();
  } catch(error) {
    console.error(error);
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isDeleteBookModalActive' @toggle-active-status='toggleDeleteBookModal'>
    <div v-if='book' id='delete'>
      <form id='deleteBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Book</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following?</p>
          <input id='deletebookID' type='hidden' name='bookID' :value='book.id'>
          <label><strong>id:</strong></label> {{ book.id }}
          <label> <strong>title:</strong> </label> {{ book.title }}
        </fieldset>
        <input id='DeleteBook' class='btn' type='submit' value='Delete Book' @click='deleteBook'>
        <input class='btn' type='button' value='Cancel' @click='toggleDeleteBookModal'>
      </form>
    </div><!-- delete -->
  </app-modal>
</template>
