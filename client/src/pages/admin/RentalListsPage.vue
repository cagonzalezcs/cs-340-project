<script setup>
import { reactive, onMounted, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewRentalList from '../../components/rental-lists/ViewRentalList.vue';
import { getAuthToken } from '../../utils/cookies';

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
    if(!rentalData.length) {
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
  const found = state.rentalLists[state.currentlySelectedRentalIndex];
  return found;
});

</script>

<template>
  <div id='rentalLists'>
    <h1>All Rental Lists</h1>
    <router-link to='/admin/users' style='margin-bottom:20px; display:inline-block; font-size: 18px; font-weight: bold;'>Back to Users
    </router-link>
    <br />
  </div>
  <div id='browseRentalLists'>
    <table v-if='state.rentalLists?.length' border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>user_id</th>
        <th></th>
      </tr>
      <tr v-for='(user, index) in state.rentalLists' :key='user.user_id'>
        <td>{{ user.user_id }}</td>
        <td>
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
</template>
