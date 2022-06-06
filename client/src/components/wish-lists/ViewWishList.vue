<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  userWishList: [],
  wishListBookForDelete: {},
  isRemoveFromWishListModalActive: false
});

const emit = defineEmits(['toggleViewWishListModal']);

const props = defineProps({
  'isViewWishListModalActive': Boolean,
  user: {
    type: Object, default: () => {
    }, required: false,
  },
});

function setUserWishList(items) {
  if (items?.length) {
    state.userWishList = items;
  }
};

watch(() => props.isViewWishListModalActive, async () => {
  if (!props.isViewWishListModalActive) {
    state.userWishList = [];
    return;
  }
  let userId = props.user.id;
  try {
    const response = await fetch(`${baseUrl}wish-lists/${userId}`, {
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
    setUserWishList(data);
  } catch (error) {
    console.error(error);
  }
});

const deleteWishListItem = async (bookId) => {
  try {
    const response = await fetch(`${ baseUrl }wish-lists/${ props.user.id }/${ bookId }`, 
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
  toggleViewWishListModal();
  } catch (error) {
    console.error(error)
  }
};

const toggleViewWishListModal = () => {
  state.wishListBookForDelete = {}
  state.isRemoveFromWishListModalActive = false
  emit('toggleViewWishListModal');
};

const handleToggleRemoveModal = (itemId) => {
  let foundData = {}
  state.userWishList?.find(data => {
    if (data?.id === itemId) {
      foundData = { bookId: data.id, bookTitle: data.title }
    }
  });
  state.wishListBookForDelete = foundData;
  state.isRemoveFromWishListModalActive = true;
};
</script>

<template>
  <div>
    <app-modal :is-modal-active='props.isViewWishListModalActive'  @toggle-active-status='toggleViewWishListModal'>
      <div v-if='props.user && props.isViewWishListModalActive' id='viewWishList'>
        <p><strong>All Wish List Books for user_id: {{ props.user.user_id }}</strong></p>
        <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
          <tr>
            <th>book_id</th>
            <th>title</th>
            <th>Delete</th>
          </tr>
          <tr v-for='(item) in state.userWishList' :key='item.user_id'>
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td><button @click='handleToggleRemoveModal(item.id)'>Delete</button></td>
          </tr>
        </table>
      </div>
      <div v-if='props.user && state.isRemoveFromWishListModalActive' id='delete' style='display: block'>
        <form id='deleteWishListBook' method='POST' class='app-form' @submit.prevent>
          <p><strong>Delete Book from Wish List</strong></p>
          <fieldset class='fields'>
          <p>Are you sure you wish to delete the following Wish List item?</p>
          <input id='deleteWishListBook' type='hidden' name='bookID' :value='state.wishListBookForDelete.bookId'>
          <label><strong>user_id:</strong></label> {{ props.user.id }}
          <label><strong>book_id:</strong></label> {{ state.wishListBookForDelete.bookId }}
          <label><strong>title:</strong> </label> {{ state.wishListBookForDelete.bookTitle }}
        </fieldset>
        <input id='DeleteBook' class='btn' type='submit' value='Delete Book From Wish List' @click='deleteWishListItem(state.wishListBookForDelete.bookId)'>
        <input class='btn' type='button' value='Cancel' @click='toggleViewWishListModal()'>
        </form>
      </div>
    </app-modal>
  </div>
</template>
