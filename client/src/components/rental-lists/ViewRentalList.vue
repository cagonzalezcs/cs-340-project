<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  userRentalList: [],
  rentalBookForDelete: {},
  isRemoveFromRentalListModalActive: false,
});

const emit = defineEmits(['toggleViewRentalListModal', 'itemDeleted']);

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
    const response = await fetch(`${ baseUrl }rental-lists/user/${ userId }`, {
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
    setUserRentalList(data);
  } catch (error) {
    console.error(error);
  }
});

const toast = useToast();

const deleteRentalListItem = async (bookId) => {
  try {
    const rentalListItemToDelete = {
      book_id: bookId,
      user_id: props.user.id,
    };
    const response = await fetch(`${ baseUrl }rental-lists`,
      {
        method: 'DELETE',
        body: JSON.stringify(rentalListItemToDelete),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status !== 200) {
      toast.error('There was an error deleting this item.');
      return;
    }
    toast.success('Rental list item successfully deleted.');
    emit('itemDeleted');
    toggleViewRentalListModal();
  } catch (error) {
    console.error(error);
  }
};

const toggleViewRentalListModal = () => {
  state.rentalBookForDelete = {};
  state.isRemoveFromRentalListModalActive = false;
  emit('toggleViewRentalListModal');
};

const handleToggleRemoveModal = (item) => {
  // state.userRentalList?.find(data => {
  //   if (data?.id === itemId) {
  //     foundData = { bookId: data.book_id, bookTitle: data.title };
  //   }
  // });
  console.log(item);
  state.rentalBookForDelete = item;
  console.log(state.rentalBookForDelete);
  state.isRemoveFromRentalListModalActive = true;
};

const cancelDelete = () => {
  state.rentalBookForDelete = {};
  state.isRemoveFromRentalListModalActive = false;
};

</script>

<template>
  <div>
    <app-modal :is-modal-active='props.isViewRentalListModalActive' @toggle-active-status='toggleViewRentalListModal'>
      <div
v-if='props.user && props.isViewRentalListModalActive && !state.isRemoveFromRentalListModalActive'
           id='viewRentalList'>
        <p class='mb-4'><strong>All Rental List Books for user_id: {{ props.user.user_id }}</strong></p>
        <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
          <tr>
            <th>book_id</th>
            <th>title</th>
            <th>Delete</th>
          </tr>
          <tr v-for='(item) in state.userRentalList' :key='item.user_id'>
            <td>{{ item.book_id }}</td>
            <td>{{ item.title }}</td>
            <td>
              <button @click='handleToggleRemoveModal(item)'>Delete</button>
            </td>
          </tr>
        </table>
      </div>
      <div v-if='props.user && state.isRemoveFromRentalListModalActive' id='delete' style='display: block'>
        <form id='deleteRentalListBook' method='POST' class='app-form' @submit.prevent>
          <legend><strong>Delete Book from Rental List</strong></legend>
          <fieldset class='fields'>
            <p>Are you sure you wish to delete the following Rental List item?</p>
            <input id='deleteRentalListBook' type='hidden' name='bookID' :value='state.rentalBookForDelete.book_id'>
            <label><strong>user_id:</strong></label> {{ props.user.id }}
            <label><strong>book_id:</strong></label> {{ state.rentalBookForDelete.book_id }}
            <label><strong>title:</strong> </label> {{ state.rentalBookForDelete.title }}
          </fieldset>
          <input
id='DeleteBook' class='app-button app-button--accept' type='submit'
                 value='Delete Book From Rental List' @click='deleteRentalListItem(state.rentalBookForDelete.book_id)'>
          <input class='app-button app-button--cancel' type='button' value='Cancel' @click='cancelDelete()'>
        </form>
      </div>
    </app-modal>
  </div>
</template>
