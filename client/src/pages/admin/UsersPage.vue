<script setup>
import { reactive } from 'vue';
import AddUserForm from '../../components/users/AddUserForm.vue';
import UpdateUserForm from '../../components/users/UpdateUserForm.vue';
import DeleteUserForm from '../../components/users/DeleteUserForm.vue';
import UserWishList from '../../components/users/UserWishList.vue';
import UserRentalList from '../../components/users/UserRentalList.vue';

let state = reactive({
  isAddUserModalActive: false,
  isUpdateUserModalActive: false,
  isDeleteUserModalActive: false,
  isUserWishListModalActive: false,
  isUserRentalListModalActive: false
});

const toggleAddUserModal = () => {
  state.isAddUserModalActive = !state.isAddUserModalActive;
};
const toggleUpdateUserModal = () => {
  state.isUpdateUserModalActive = !state.isUpdateUserModalActive;
};
const toggleDeleteUserModal = () => {
  state.isDeleteUserModalActive = !state.isDeleteUserModalActive;
};
const toggleUserWishListModal = () => {
  state.isUserWishListModalActive = !state.isUserWishListModalActive;
};
const toggleUserRentalListModal = () => {
  state.isUserRentalListModalActive = !state.isUserRentalListModalActive;
};
</script>

<template>
  <div>
    <h1>Users</h1>
    <router-link to='/admin/rental-lists' style='margin-right: 10px'>View Rental Lists</router-link>
    <router-link to='/admin/wish-lists' style='margin-right: 10px'>View Wish Lists</router-link>
    <br />
  </div>
  <div id='browse'>
    <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
      <tr>
        <th>id</th>
        <th>user_role_id</th>
        <th>first_name</th>
        <th>last_name</th>
        <th>email</th>
        <th>address_line_1</th>
        <th>address_line_2</th>
        <th>city</th>
        <th>state</th>
        <th></th>
        <th></th>
        <th></th>
        <th><button @click='toggleAddUserModal'>Add New User</button></th>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>Baryram</td>
        <td>Basil</td>
        <td>bbasil0@thetimes.co.uk</td>
        <td>6 Farwell Trail</td>
        <td>NULL</td>
        <td>New York City</td>
        <td>New York</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>2</td>
        <td>1</td>
        <td>Kerry</td>
        <td>Wybern</td>
        <td>kwybern6@paginegialle.it</td>
        <td>24448 Stang Street</td>
        <td>Suite 3</td>
        <td>Lancaster</td>
        <td>Pennsylvania</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>3</td>
        <td>3</td>
        <td>Christye</td>
        <td>Vinck</td>
        <td>cvinck1@washington.edu</td>
        <td>188 Tennyson Plaza</td>
        <td>NULL</td>
        <td>Reno</td>
        <td>Nevada</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>4</td>
        <td>2</td>
        <td>Gwenni</td>
        <td>Preece</td>
        <td>gpreece2@seesaa.net</td>
        <td>4 Melody Plaza</td>
        <td>Apartment 4</td>
        <td>Denver</td>
        <td>Colorado</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>5</td>
        <td>2</td>
        <td>Glennis</td>
        <td>Spours</td>
        <td>gspours3@sohu.com</td>
        <td>21 Memorial Crossing</td>
        <td>NULL</td>
        <td>Sacramento</td>
        <td>California</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>6</td>
        <td>4</td>
        <td>Saba</td>
        <td>Bainton</td>
        <td>sbainton4@sohu.com</td>
        <td>1771 Scoville Street</td>
        <td>NULL</td>
        <td>Jacksonville</td>
        <td>Florida</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>7</td>
        <td>4</td>
        <td>Maxine</td>
        <td>Kiellor</td>
        <td>mkiellor5@amazon.co.jp</td>
        <td>347 Kropf Drive</td>
        <td>Suite 451</td>
        <td>Memphis</td>
        <td>Tennessee</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>8</td>
        <td>4</td>
        <td>Deerdre</td>
        <td>Van Bruggen</td>
        <td>dvanbruggen7@soup.io</td>
        <td>371 Lindbergh Road</td>
        <td>NULL</td>
        <td>Atlanta</td>
        <td>Georgia</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>9</td>
        <td>4</td>
        <td>Waverly</td>
        <td>Wellbeloved</td>
        <td>wwellbeloved8@sogou.com</td>
        <td>096 Coleman Trail</td>
        <td>NULL</td>
        <td>Oklahoma City</td>
        <td>Oklahoma</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
      <tr>
        <td>10</td>
        <td>4</td>
        <td>Pauly</td>
        <td>Guidotti</td>
        <td>pguidotti9@ucoz.ru</td>
        <td>347 Kropf Drive</td>
        <td>NULL</td>
        <td>Grand Rapids</td>
        <td>Michigan</td>
        <td><button @click='toggleUserWishListModal'>View Wish List</button></td>
        <td><button @click='toggleUserRentalListModal'>View Rental List</button></td>
        <td><button @click='toggleUpdateUserModal'>Edit User</button></td>
        <td><button @click='toggleDeleteUserModal'>Delete User</button></td>
      </tr>
    </table>
  </div><!-- browse -->

  <add-user-form :is-add-user-modal-active='state.isAddUserModalActive' @toggle-add-user-modal='toggleAddUserModal' />
  <update-user-form :is-update-user-modal-active='state.isUpdateUserModalActive' @toggle-update-user-modal='toggleUpdateUserModal' />
  <delete-user-form :is-delete-user-modal-active='state.isDeleteUserModalActive' @toggle-delete-user-modal='toggleDeleteUserModal' />
  <user-wish-list :is-user-wish-list-modal-active='state.isUserWishListModalActive' @toggle-user-wish-list-modal='toggleUserWishListModal' />
  <user-rental-list :is-user-rental-list-modal-active='state.isUserRentalListModalActive' @toggle-user-rental-list-modal='toggleUserRentalListModal' />

</template>
