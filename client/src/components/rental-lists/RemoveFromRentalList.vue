<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;

const props = defineProps({
  'isRemoveFromRentalListModalActive': Boolean,
  user: {
    type: Object, default: () => {
    }, required: false,
  },
  item: {
    type: Object, default: () => {
    }, required: false,
  },
});
const emit = defineEmits(['toggleRemoveFromRentalListModal']);

const toggleRemoveFromRentalListModal = () => {
  emit('toggleRemoveFromRentalListModal');
};

const toast = useToast();

const deleteRentalListItem = async () => {
  try {
    const response = await fetch(`${ baseUrl }rental-lists/${ props.user.id }/${ props.item.id }`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status !== 200) {
      toast.error('There was an error deleting this item');
      return;
    }
    toast.success('Rental list item successfully deleted');
    emit('itemDeleted');
    toggleRemoveFromRentalListModal();
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <app-modal
    :is-modal-active='props.isRemoveFromRentalListModalActive'
    @toggle-active-status='toggleRemoveFromRentalListModal'>
    <div v-if='props.user' id='delete' style='display: block'>
      <form id='deleteRentalListBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Delete Book from Rental List</strong></legend>
        <fieldset class='fields'>
          <p>Are you sure you wish to delete the following Rental List item?</p>
          <input id='deleteRentalListBook' type='hidden' name='bookID' :value='props.item.id'>
          <label><strong>user_id:</strong></label> {{ props.user.id }}
          <label><strong>book_id:</strong></label> {{ props.item.id }}
          <label><strong>title:</strong> </label> {{ props.item.title }}
        </fieldset>
        <input
          id='DeleteBook' class='btn' type='submit' value='Delete Book From Rental List'
          @click='deleteRentalListItem()'>
        <input class='btn' type='button' value='Cancel' @click='toggleRemoveFromRentalListModal()'>
      </form>
    </div>
  </app-modal>
</template>
