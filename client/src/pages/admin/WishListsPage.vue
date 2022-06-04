<script setup>
import { reactive, onMounted } from 'vue';
import { checkUserIsAdmin } from '../../router/middleware';
import ViewWishList from '../../components/wish-lists/ViewWishList.vue';
import RemoveFromWishList from '../../components/wish-lists/RemoveFromWishList.vue';
import AdminLayout from '../../components/layouts/AdminLayout.vue';

onMounted(async () => {
  await checkUserIsAdmin();
});

let state = reactive({
  isViewWishListModalActive: false,
  isRemoveFromWishListModalActive: false
});

const toggleViewWishListModal = () => {
  state.isViewWishListModalActive = !state.isViewWishListModalActive;
};
const toggleRemoveFromWishListModal = () => {
  state.isViewWishListModalActive = false;
  state.isRemoveFromWishListModalActive = !state.isRemoveFromWishListModalActive;
};
</script>

<template>
  <admin-layout>
    <div id='wishLists'>
      <h1>All Wish Lists</h1>
      <router-link to='/admin/users' style='margin-bottom:20px; display:inline-block; font-size: 18px; font-weight: bold;'>Back to Users</router-link>
      <br />
    </div>
    <div id='browseWishLists'>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>user_id</th>
          <th></th>
          <th><a href='#'>Create </a></th>
        </tr>
        <tr>
          <td>1</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>

        </tr>
        <tr>
          <td>2</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>3</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>4</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>5</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>6</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>7</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>8</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>9</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
        <tr>
          <td>10</td>
          <td><button @click='toggleViewWishListModal'>View User Wish List</button></td>
          <td><a href='#'>Delete User Wish List</a></td>
        </tr>
      </table>
    </div><!-- browse -->

    <view-wish-list
      :is-view-wish-list-modal-active='state.isViewWishListModalActive'
      @toggle-view-wish-list-modal='toggleViewWishListModal'
      @toggle-remove-from-wish-list-modal='toggleRemoveFromWishListModal'
    />
    <remove-from-wish-list
      :is-remove-from-wish-list-modal-active='state.isRemoveFromWishListModalActive'
      @toggle-remove-from-wish-list-modal='toggleRemoveFromWishListModal'
    />
  </admin-layout>
</template>

<style lang='scss' scoped>
form {
  width: 600px;
  margin-left: auto;
  margin-right: auto;

  .fields {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 10px 25px 35px;
    margin-bottom: 20px;

    label {
      margin-top: 10px;
      margin-bottom: 3px;
      font-weight: 500;
    }
  }

  input[type="submit"],
  input[type="button"] {
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
