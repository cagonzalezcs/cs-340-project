<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isRemoveFromWishListModalActive': Boolean,
});
const emit = defineEmits(['toggleRemoveFromWishListModal']);

const toggleRemoveFromWishListModal = () => {
  emit('toggleRemoveFromWishListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isRemoveFromWishListModalActive' @toggle-active-status='toggleRemoveFromWishListModal'>
    <div id='delete' style='display: block'>
      <form id='deleteWishListBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Book from Wish List</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following Wish List item?</p>
          <input id='deleteWishListBook' type='hidden' name='bookID' value='3'>
          <label><strong>user_id:</strong></label> 1
          <label><strong>book_id:</strong></label> 3
          <label><strong>title:</strong> </label> nisi venenatis tristique fusce
        </fieldset>
        <input id='DeleteWishListBook' class='btn' type='submit' value='Delete Book From Wish List'>
        <input class='btn' type='button' value='Cancel' @click='toggleRemoveFromWishListModal'>
      </form>
    </div><!-- deleteWishListItem -->
  </app-modal>
</template>
