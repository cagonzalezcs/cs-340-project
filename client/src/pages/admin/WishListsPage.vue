<script setup>
import { reactive, onMounted, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewWishList from '../../components/wish-lists/ViewWishList.vue';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import { getAuthToken } from '../../utils/cookies';
import AddToWishList from '../../components/wish-lists/AddToWishList.vue';
import { useAdminStore } from '../../stores/admin';

const adminStore = useAdminStore();

onMounted(async () => {
  await checkUserIsAdmin();
  await getWishLists();
});

let state = reactive({
  isViewWishListModalActive: false,
  isAddWishListModalActive: false,
  currentlySelectedWishListIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleViewModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedWishListIndex = userIndex;
  }
  state.isViewWishListModalActive = !state.isViewWishListModalActive;
};

function setWishListItems(items) {
  adminStore.wishLists = items?.length ? items : [];
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
    if (!wishListData.length) {
      return;
    }
    setWishListItems(wishListData);
  } catch (error) {
    console.error(error);
  }
}

const currentUser = computed(() => {
  if (!adminStore.wishLists || state.currentlySelectedWishListIndex < 0) {
    return [];
  }
  return adminStore.wishLists[state.currentlySelectedWishListIndex];
});

const toggleAddToWishListModal = () => {
  state.isAddWishListModalActive = !state.isAddWishListModalActive;
};

const handleWishListItemAdded = async () => {
  toggleAddToWishListModal();
  await getWishLists();
};

const handleWishListItemDeleted = async () => {
  await getWishLists();
};
</script>

<template>
  <admin-layout>
    <header class='app-header'>
      <h1 class='app-header__heading'>All Wish Lists</h1>
      <div class='app-header__actions pr-1'>
        <router-link
          to='/admin/users'
          class='app-header__link'>Back to Users
        </router-link>
        <button class='app-header__button' @click='toggleAddToWishListModal'>Add Items to User Wish List</button>
      </div>
    </header>
    <div id='browseWishLists'>
      <table
        v-if='adminStore.wishLists?.length' border='1' cellpadding='5'
        style='margin-left: auto; margin-right: auto;' class='app-table'>
        <tr>
          <th>user id</th>
          <th></th>
        </tr>
        <tr v-for='(user, index) in adminStore.wishLists' :key='user.user_id'>
          <td>{{ user.user_id }}</td>
          <td class='text-right'>
            <button @click='toggleViewModal(index)'>View Wish List Items</button>
          </td>
        </tr>
      </table>
    </div><!-- browseWishList -->

    <view-wish-list
      :is-view-wish-list-modal-active='state.isViewWishListModalActive'
      :user='currentUser'
      @toggle-view-wish-list-modal='toggleViewModal'
      @item-deleted='handleWishListItemDeleted'
    />
    <add-to-wish-list
      :is-add-to-wish-list-modal-active='state.isAddWishListModalActive'
      @toggle-add-to-wish-list-modal='toggleAddToWishListModal'
      @wish-list-item-added='handleWishListItemAdded'
    ></add-to-wish-list>
  </admin-layout>
</template>

<style scoped lang='scss'>
.app-header__button {
  width: 300px;
}
</style>
