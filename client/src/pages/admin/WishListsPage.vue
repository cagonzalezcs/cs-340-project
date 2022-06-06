<script setup>
import { reactive, onMounted, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewWishList from '../../components/wish-lists/ViewWishList.vue';
import { getAuthToken } from '../../utils/cookies';

onMounted(async () => {
  await checkUserIsAdmin();
  await getWishLists();
});

let state = reactive({
  isViewWishListModalActive: false,
  wishLists: [], 
  currentlySelectedWishListIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleViewModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedWishListIndex = userIndex;
  }
  state.isViewWishListModalActive = !state.isViewWishListModalActive;
};

function setWishs(items) {
  if (items?.length) {
    state.wishLists = items;
  }
};

async function getWishLists() {
  const wishListUrl = `${ baseUrl }wish-lists`;
  try {
    const response = await fetch(wishListUrl, {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const wishListData = await response.json();
    if(!wishListData.length) {
      return;
    }
    setWishs(wishListData);
  } catch (error) {
    console.error(error);
  }
};

const currentUser = computed(() => {
  if (state.currentlySelectedWishListIndex < 0) {
    return [];
  }
  const found = state.wishLists[state.currentlySelectedWishListIndex];
  return found;
});

</script>

<template>
  <div id='wishLists'>
    <h1>All Wish Lists</h1>
    <router-link to='/admin/users' style='margin-bottom:20px; display:inline-block; font-size: 18px; font-weight: bold;'>Back to Users
    </router-link>
    <br />
  </div>
  <div id='browseWishLists'>
    <table v-if='state.wishLists?.length' border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>user_id</th>
        <th></th>
      </tr>
      <tr v-for='(user, index) in state.wishLists' :key='user.user_id'>
        <td>{{ user.user_id }}</td>
        <td>
          <button @click='toggleViewModal(index)'>View Wish List Items</button>
        </td>
      </tr>
     
    </table>
  </div><!-- browseWishList -->

  <view-wish-list
    :is-view-wish-list-modal-active='state.isViewWishListModalActive'
    :user='currentUser'
    @toggle-view-wish-list-modal='toggleViewModal'
  />
</template>
