<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isUserWishListModalActive': Boolean,
});
const emit = defineEmits(['toggleUserWishListModal']);

const toggleUserWishListModal = () => {
  emit('toggleUserWishListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isUserWishListModalActive' @toggle-active-status='toggleUserWishListModal'>
    <div id='viewWishList'>
      <p><strong>All Wish List Books for user_id: 1</strong></p>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>book_id</th>
          <th>title</th>
          <th></th>
        </tr>
        <tr>
          <td>3</td>
          <td>nisi venenatis tristique fusce</td>
          <td><a href='#'>Delete</a></td>
        </tr>
        <tr>
          <td>9</td>
          <td>auctor gravida sem praesent id</td>
          <td><a href='#'>Delete</a></td>
        </tr>
        <tr>
          <td>7</td>
          <td>in leo maecenas pulvinar lobortis est phasellus</td>
          <td><a href='#'>Delete</a></td>
        </tr>
        <tr>
          <td>2</td>
          <td>bibendum imperdiet nullam orci pede venenatis non ...</td>
          <td><a href='#'>Delete</a></td>
        </tr>
      </table>
    </div><!-- viewWishList by User -->
  </app-modal>
</template>
