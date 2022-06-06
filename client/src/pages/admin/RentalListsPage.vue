<script setup>
import { computed, onMounted, reactive } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewRentalList from '../../components/rental-lists/ViewRentalList.vue';
import { getAuthToken } from '../../utils/cookies';
import AdminLayout from '../../components/layouts/AdminLayout.vue';

onMounted(async () => {
  await checkUserIsAdmin();
  await getRentalLists();
});

let state = reactive({
  isViewRentalListModalActive: false,
  rentalLists: [],
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
  if (items?.length) {
    state.rentalLists = items;
  }
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
  if (state.currentlySelectedRentalIndex < 0) {
    return [];
  }
  return state.rentalLists[state.currentlySelectedRentalIndex];
});

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
      </div>
    </header>

    <div id='browseRentalLists'>
      <table
        v-if='state.rentalLists?.length' border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'
        class='app-table'>
        <tr>
          <th>user id</th>
          <th></th>
        </tr>
        <tr v-for='(user, index) in state.rentalLists' :key='user.user_id'>
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
    />
  </admin-layout>
</template>
