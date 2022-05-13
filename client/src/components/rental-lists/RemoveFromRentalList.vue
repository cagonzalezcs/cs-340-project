<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isRemoveFromRentalListModalActive': Boolean,
});
const emit = defineEmits(['toggleRemoveFromRentalListModal']);

const toggleRemoveFromRentalListModal = () => {
  emit('toggleRemoveFromRentalListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isRemoveFromRentalListModalActive' @toggle-active-status='toggleRemoveFromRentalListModal'>
    <div id='delete' style='display: block'>
      <form id='deleteRentalListBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Book from Rental List</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following Rental List item?</p>
          <input id='deleteRentalListBook' type='hidden' name='bookID' value='3'>
          <label><strong>user_id:</strong></label> 1
          <label><strong>book_id:</strong></label> 10
          <label><strong>title:</strong> </label> in est risus auctor sed tristique in tempus sit
        </fieldset>
        <input id='DeleteUser' class='btn' type='submit' value='Delete Book From Rental List'>
        <input class='btn' type='button' value='Cancel' @click='toggleRemoveFromRentalListModal'>
      </form>
    </div><!-- deleteRentalListItem -->
  </app-modal>
</template>
