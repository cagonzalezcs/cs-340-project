<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isUserRentalListModalActive': Boolean,
});
const emit = defineEmits(['toggleUserRentalListModal']);

const toggleUserRentalListModal = () => {
  emit('toggleUserRentalListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isUserRentalListModalActive' @toggle-active-status='toggleUserRentalListModal'>
    <div id='viewRentalList'>
      <p><strong>All Rental List Books for user_id: 1</strong></p>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>book_id</th>
          <th>title</th>
          <th><a href='#'>Add </a></th>
        </tr>
        <tr>
          <td>10</td>
          <td>in est risus auctor sed tristique in tempus sit</td>
          <td><a href='#'>Delete</a></td>
        </tr>
        <tr>
          <td>8</td>
          <td>quisque ut erat curabitur gravida nisi at</td>
          <td><a href='#'>Delete</a></td>
        </tr>
      </table>
    </div><!-- viewRentalList by user -->
  </app-modal>
</template>
