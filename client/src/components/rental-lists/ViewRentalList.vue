<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  userRentalList: [],
  rentalBookForDelete: {},
  isRemoveFromRentalListModalActive: false
});

const emit = defineEmits(['toggleViewRentalListModal']);

const props = defineProps({
  'isViewRentalListModalActive': Boolean,
  user: {
    type: Object, default: () => {
    }, required: false,
  },
});

function setUserRentalList(items) {
  if (items?.length) {
    state.userRentalList = items;
  }
};

watch(() => props.isViewRentalListModalActive, async () => {
  if (!props.isViewRentalListModalActive) {
    state.userRentalList = [];
    return;
  }
  let userId = props.user.id;
  try {
    const response = await fetch(`${baseUrl}rental-lists/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if(!data.length) {
      return;
    }
    setUserRentalList(data);
  } catch (error) {
    console.error(error);
  }
});

const deleteRentalListItem = async (bookId) => {
  try {
    const response = await fetch(`${ baseUrl }rental-lists/${ props.user.id }/${ bookId }`, 
    {
      method: 'DELETE',
      headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${ getAuthToken() }`,
    }
  });

  if (response.status !== 200) {
    alert('There was an error deleting this item.');
    return;
  }
  alert('Successfully Deleted.');
  emit('itemDeleted');
  toggleViewRentalListModal();
  } catch (error) {
    console.error(error)
  }
};

const toggleViewRentalListModal = () => {
  state.rentalBookForDelete = {}
  state.isRemoveFromRentalListModalActive = !state.isRemoveFromRentalListModalActive
  emit('toggleViewRentalListModal');
};

const handleToggleRemoveModal = (itemId) => {
  let foundData = {}
  state.userRentalList?.find(data => {
    if (data?.id === itemId) {
      foundData = { bookId: data.id, bookTitle: data.title }
    }
  });
  state.rentalBookForDelete = foundData;
  state.isRemoveFromRentalListModalActive = !state.isRemoveFromRentalListModalActive;
};

</script>

<template>
  <div>
    <app-modal :is-modal-active='props.isViewRentalListModalActive'  @toggle-active-status='toggleViewRentalListModal'>
      <div v-if='props.user && props.isViewRentalListModalActive' id='viewRentalList'>
        <p><strong>All Rental List Books for user_id: {{ props.user.user_id }}</strong></p>
        <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
          <tr>
            <th>book_id</th>
            <th>title</th>
            <th>Delete</th>
          </tr>
          <tr v-for='(item) in state.userRentalList' :key='item.user_id'>
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td><input type='radio' @click='handleToggleRemoveModal(item.id)'></td>
          </tr>
        </table>
      </div>
      <div v-if='props.user && state.isRemoveFromRentalListModalActive' id='delete' style='display: block'>
        <form id='deleteRentalListBook' method='POST' class='app-form' @submit.prevent>
          <p><strong>Delete Book from Rental List</strong></p>
          <fieldset class='fields'>
          <p>Are you sure you wish to delete the following Rental List item?</p>
          <input id='deleteRentalListBook' type='hidden' name='bookID' :value='state.rentalBookForDelete.bookId'>
          <label><strong>user_id:</strong></label> {{ props.user.id }}
          <label><strong>book_id:</strong></label> {{ state.rentalBookForDelete.bookId }}
          <label><strong>title:</strong> </label> {{ state.rentalBookForDelete.bookTitle }}
        </fieldset>
        <input id='DeleteBook' class='btn' type='submit' value='Delete Book From Rental List' @click='deleteRentalListItem(state.rentalBookForDelete.bookId)'>
        <input class='btn' type='button' value='Cancel' @click='toggleViewRentalListModal()'>
        </form>
      </div>
    </app-modal>
  </div>
</template>
