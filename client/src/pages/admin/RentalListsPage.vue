<script setup>
import { computed, onMounted, reactive } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewRentalList from '../../components/rental-lists/ViewRentalList.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';
import AddToRentalList from '../../components/rental-lists/AddToRentalList.vue';
import { useAdminStore } from '../../stores/admin';

const adminStore = useAdminStore();

onMounted(async () => {
  await checkUserIsAdmin();
  await getRentalLists();
});

let state = reactive({
  isViewRentalListModalActive: false,
  isAddRentalListModalActive: false,
  currentlySelectedRentalIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleViewModal = (userIndex) => {
  if (!isNaN(userIndex)) {
    state.currentlySelectedRentalIndex = userIndex;
  }
  state.isViewRentalListModalActive = !state.isViewRentalListModalActive;
};

function setRentals(items) {
  adminStore.rentalLists = items?.length ? items : [];
};

async function getRentalLists() {
  const rentalUrl = `${ baseUrl }rental-lists`;
  try {
    const response = await fetch(rentalUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const rentalData = await response.json();
    if (!rentalData.length) {
      return;
    }
    setRentals(rentalData);
  } catch (error) {
    console.error(error);
  }
};

const currentUser = computed(() => {
  if (!adminStore.rentalLists || state.currentlySelectedRentalIndex < 0) {
    return [];
  }
  return adminStore.rentalLists[state.currentlySelectedRentalIndex];
});

const toggleAddToRentalListModal = () => {
  state.isAddRentalListModalActive = !state.isAddRentalListModalActive;
};

const handleRentalListItemAdded = async () => {
  toggleAddToRentalListModal();
  await getRentalLists();
};

const handleRentalListItemDeleted = async () => {
  await getRentalLists();
};

</script>

<template>
  <admin-layout>
    <header class='app-header'>
      <h1 class='app-header__heading'>All Rental Lists</h1>
      <div class='app-header__actions pr-1'>
        <router-link
          to='/admin/users'
          class='app-header__link'>Back to Users
        </router-link>
        <button class='app-header__button' @click='toggleAddToRentalListModal'>Add Items to User Rental List</button>
      </div>
    </header>

    <div id='browseRentalLists'>
      <table
        v-if='adminStore.rentalLists?.length' border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'
        class='app-table'>
        <tr>
          <th>user id</th>
          <th></th>
        </tr>
        <tr v-for='(user, index) in adminStore.rentalLists' :key='user.user_id'>
          <td>{{ user.user_id }}</td>
          <td class='text-right'>
            <button @click='toggleViewModal(index)'>View Rental List Items</button>
          </td>
        </tr>
      </table>
    </div><!-- browseRentalList -->

    <view-rental-list
      :is-view-rental-list-modal-active='state.isViewRentalListModalActive'
      :user='currentUser'
      @toggle-view-rental-list-modal='toggleViewModal'
      @item-deleted='handleRentalListItemDeleted'
    />
    <add-to-rental-list
      :is-add-to-rental-list-modal-active='state.isAddRentalListModalActive'
      @toggle-add-to-rental-list-modal='toggleAddToRentalListModal'
      @rental-list-item-added='handleRentalListItemAdded'
    ></add-to-rental-list>
  </admin-layout>
</template>

<style scoped lang='scss'>
.app-header__button {
  width: 300px;
}
</style>
