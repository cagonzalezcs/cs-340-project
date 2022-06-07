<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  userWishList: [],
  wishListBookForDelete: {},
  isRemoveFromWishListModalActive: false
});

const emit = defineEmits(['toggleViewWishListModal', 'itemDeleted']);

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
    const response = await fetch(`${baseUrl}wish-lists/user/${userId}`, {
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

const toast = useToast();

const deleteWishListItem = async (bookId) => {
  try {
    const wishListItemToDelete = {
      book_id: bookId,
      user_id: props.user.id,
    };
    const response = await fetch(`${ baseUrl }wish-lists`,
    {
      method: 'DELETE',
      body: JSON.stringify(wishListItemToDelete),
      headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${ getAuthToken() }`,
    }
  });

  if (response.status !== 200) {
    toast.error('There was an error deleting this item');
    return;
  }
    toast.success('Wish list item successfully deleted');
  emit('itemDeleted');
  toggleViewWishListModal();
  } catch (error) {
    console.error(error);
  }
};

const toggleViewWishListModal = () => {
  state.wishListBookForDelete = {};
  state.isRemoveFromWishListModalActive = false;
  emit('toggleViewWishListModal');
};

const handleToggleRemoveModal = (item) => {
  state.wishListBookForDelete = item;
  state.isRemoveFromWishListModalActive = true;
};

const cancelDelete = () => {
  state.wishListBookForDelete = {};
  state.isRemoveFromWishListModalActive = false;
};
</script>

<template>
  <div>
    <app-modal :is-modal-active='props.isViewWishListModalActive'  @toggle-active-status='toggleViewWishListModal'>
      <div v-if='props.user && props.isViewWishListModalActive && !state.isRemoveFromWishListModalActive' id='viewWishList'>
        <p class='mb-4'><strong>All Wish List Books for user_id: {{ props.user.user_id }}</strong></p>
        <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
          <tr>
            <th>book_id</th>
            <th>title</th>
            <th>Delete</th>
          </tr>
          <tr v-for='(item) in state.userWishList' :key='item.user_id'>
            <td>{{ item.book_id }}</td>
            <td>{{ item.title }}</td>
            <td><button @click='handleToggleRemoveModal(item)'>Delete</button></td>
          </tr>
        </table>
      </div>
      <div v-if='props.user && state.isRemoveFromWishListModalActive' id='delete' style='display: block'>
        <form id='deleteWishListBook' method='POST' class='app-form' @submit.prevent>
          <legend><strong>Delete Book from Wish List</strong></legend>
          <fieldset class='fields'>
          <p>Are you sure you wish to delete the following Wish List item?</p>
          <input id='deleteWishListBook' type='hidden' name='bookID' :value='state.wishListBookForDelete.book_id'>
          <label><strong>user_id:</strong></label> {{ props.user.id }}
          <label><strong>book_id:</strong></label> {{ state.wishListBookForDelete.book_id }}
          <label><strong>title:</strong> </label> {{ state.wishListBookForDelete.title }}
        </fieldset>
        <input id='DeleteBook' class='app-button app-button--accept' type='submit' value='Delete Book From Wish List' @click='deleteWishListItem(state.wishListBookForDelete.book_id)'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='cancelDelete()'>
        </form>
      </div>
    </app-modal>
  </div>
</template>
