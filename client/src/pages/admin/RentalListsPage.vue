<script setup>
import { reactive, onMounted, computed } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewRentalList from '../../components/rental-lists/ViewRentalList.vue';
import RemoveFromRentalList from '../../components/rental-lists/RemoveFromRentalList.vue';
import { getAuthToken } from '../../utils/cookies';

onMounted(async () => {
  await checkUserIsAdmin();
  await getRentalLists();
});

let state = reactive({
  isViewRentalListModalActive: false,
  isRemoveFromRentalListModalActive: false,
  rentalLists: [], 
  currentlySelectedRentalIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toggleViewRentalListModal = () => {
  state.isViewRentalListModalActive = !state.isViewRentalListModalActive;
};
const toggleRemoveFromRentalListModal = () => {
  state.isViewRentalListModalActive = false;
  state.isRemoveFromRentalListModalActive = !state.isRemoveFromRentalListModalActive;
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

const currentlySelectedRentalIndex = computed(() => {
  if (state.currentlySelectedRentalIndex < 0) {
    return [];
  }
  return state.rentalLists[state.currentlySelectedRentalIndex];
});

const handleListDeleted = () => {
  getRentalLists();
};

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
        <th>Actions</th>
      </tr>
      <tr v-for='(user, index) in state.rentalLists' :key='user.user_id'>
        <td>{{ user.user_id }}</td>
        <td>
          <button @click='toggleViewRentalListModal(index)'>View User Rental List</button>
        </td>
        <td><button @click='toggleRemoveFromRentalListModal(index)'></button></td>
      </tr>
     
    </table>
  </div><!-- browseRentalList -->

  <view-rental-list
    :is-view-rental-list-modal-active='state.isViewRentalListModalActive'
    @toggle-view-rental-list-modal='toggleViewRentalListModal'
    @toggle-remove-from-rental-list-modal='toggleRemoveFromRentalListModal'
  />
  <remove-from-rental-list
    :is-remove-from-rental-list-modal-active='state.isRemoveFromRentalListModalActive'
    @toggle-remove-from-rental-list-modal='toggleRemoveFromRentalListModal'
  />

</template>
