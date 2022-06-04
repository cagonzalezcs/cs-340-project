<script setup>
import { reactive, onMounted } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware.js';
import ViewRentalList from '../../components/rental-lists/ViewRentalList.vue';
import RemoveFromRentalList from '../../components/rental-lists/RemoveFromRentalList.vue';

onMounted(async () => {
  await checkUserIsAdmin();
});

let state = reactive({
  isViewRentalListModalActive: false,
  isRemoveFromRentalListModalActive: false,
});

const toggleViewRentalListModal = () => {
  state.isViewRentalListModalActive = !state.isViewRentalListModalActive;
};
const toggleRemoveFromRentalListModal = () => {
  state.isViewRentalListModalActive = false;
  state.isRemoveFromRentalListModalActive = !state.isRemoveFromRentalListModalActive;
};
</script>

<template>
  <div id='rentalLists'>
    <h1>All Rental Lists</h1>
    <router-link
to='/admin/users'
                 style='margin-bottom:20px; display:inline-block; font-size: 18px; font-weight: bold;'>Back to Users
    </router-link>
    <br />
  </div>
  <div id='browseRentalLists'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>user_id</th>
        <th></th>
        <th>Actions</th>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>

      </tr>
      <tr>
        <td>2</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>3</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>4</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>5</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>6</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>7</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>8</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>9</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
      </tr>
      <tr>
        <td>10</td>
        <td>
          <button @click='toggleViewRentalListModal'>View User Rental List</button>
        </td>
        <td><a href='#'>Delete User Rental List</a></td>
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
